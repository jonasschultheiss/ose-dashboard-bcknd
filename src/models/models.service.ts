import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { AssetsService } from 'src/assets/assets.service';
import { NetilionResponseDto } from 'src/assets/dto/netilion-response.dto';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { OAuthService } from 'src/netilion-request/oauth.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateModelDto } from './dto/create-model.dto';
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
    private usersService: UsersService
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
