import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { AssetsService } from 'src/assets/assets.service';
import { NetilionResponseDto } from 'src/assets/dto/netilion-response.dto';
import { LinkingStatus } from 'src/assets/enums/linkingStatus.enum';
import { MeshesService } from 'src/meshes/meshes.service';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { OAuthService } from 'src/netilion-request/oauth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateModelDto } from './dto/create-model.dto';
import { ManualLinkDto } from './dto/manual-link.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { ModelsRepository } from './models.repository';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelsRepository)
    private readonly modelsRepository: ModelsRepository,
    private readonly configService: ConfigService,
    private oauthService: OAuthService,
    private netilionRequestService: NetilionRequestService,
    private assetsService: AssetsService,
    private usersService: UsersService,
    private meshesService: MeshesService
  ) {}

  @Cron('*/30 * * * *')
  async handleCron() {
    const models = await this.findAll();
    if (models) {
      for await (const model of models) {
        const user = await this.usersService.findOneWithRefreshToken(model.owner.id);
        await this.createOrUpdateAssets(user, model);
      }
    }
  }

  async manuallyLinkAsset(modelId, assetId, manualLinkDto: ManualLinkDto) {
    const assets = await this.assetsService.getAssetsOfModel(modelId);
    const { id: confirmedId } = assets.find(element => element.id === assetId);
    const mesh = await this.meshesService.findOne(manualLinkDto.name);
    if (confirmedId && confirmedId) {
      await this.assetsService.link(confirmedId, mesh, LinkingStatus.MANUALLY_LINKED);
    } else {
      throw new NotFoundException();
    }
  }

  async autoLinkAssets(id: number) {
    const assets = await this.assetsService.getAssetsOfModel(id);
    for await (const asset of assets) {
      const { id } = asset;
      await this.autoLinkAsset(id);
    }
  }

  private async autoLinkAsset(id: number) {
    const asset = await this.assetsService.findOne(id);
    if (asset && asset.tag) {
      const mesh = await this.meshesService.findOne(asset.tag.name);
      if (mesh) {
        try {
          await this.assetsService.link(asset.id, mesh, LinkingStatus.AUTOMATICALLY_LINKED);
        } catch (error) {
          await this.assetsService.changeLinkingStatus(asset.id, LinkingStatus.AUTOMATIC_LINKING_FAILED);
        }
      } else {
        await this.assetsService.changeLinkingStatus(asset.id, LinkingStatus.NOT_LINKED);
      }
    }
  }

  async create(createModelDto: CreateModelDto, user: User): Promise<Model> {
    const model = await this.modelsRepository.createModel(createModelDto, user);
    this.createOrUpdateAssets(user, model);
    return model;
  }

  async findAll(): Promise<Model[]> {
    return this.modelsRepository.find();
  }

  async findOne(id: number): Promise<Model> {
    const asset = await this.modelsRepository.findOne(id);
    if (!asset) {
      throw new NotFoundException(`Could not find Model with id: ${id}`);
    }

    return asset;
  }

  update(id: number, updateModelDto: UpdateModelDto) {
    return this.modelsRepository.updateModel(id, updateModelDto);
  }

  private async createOrUpdateAssets(user: User, model: Model): Promise<void> {
    const netilionResponses: NetilionResponseDto[] = await this.fetchAllAssets(user);

    for await (const asset of netilionResponses) {
      await this.assetsService.createOrUpdateAsset(asset, model);
    }
  }

  private async fetchAllAssets(user: User): Promise<NetilionResponseDto[]> {
    return this.netilionRequestService.getAssets(user);
  }

  async autoCompleteAddress(query: string) {
    const apiKey = this.configService.get('geolocationApiKey');
    const { data } = await axios.get(`https://geocode.search.hereapi.com/v1/geocode?q=${query}&apiKey=${apiKey}`);
    return data;
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<Model> {
    return this.modelsRepository.updateLocation(id, updateLocationDto);
  }

  async getModelLocation(id: number) {
    const model = await this.findOne(id);
    const apiKey = this.configService.get('geolocationApiKey');
    const { data } = await axios.get(
      `https://lookup.search.hereapi.com/v1/lookup?id=${model.location}&apiKey=${apiKey}`
    );
    return data;
  }
}
