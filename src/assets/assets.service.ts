import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mesh } from 'src/meshes/entities/mesh.entity';
import { Model } from 'src/models/entities/model.entity';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { ProductsService } from 'src/products/products.service';
import { StatusService } from 'src/status/status.service';
import { TagsService } from 'src/tags/tags.service';
import { AssetsRepository } from './assets.repository';
import { NetilionResponseDto } from './dto/netilion-response.dto';
import { Asset } from './entities/asset.entity';
import { LinkingStatus } from './enums/linkingStatus.enum';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetsRepository)
    private readonly assetsRepository: AssetsRepository,
    private readonly netilionRequestService: NetilionRequestService,
    private readonly statusService: StatusService,
    private readonly productService: ProductsService,
    private readonly tagService: TagsService
  ) {}

  async findAll(): Promise<Asset[]> {
    return this.assetsRepository.find();
  }

  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetsRepository.findOne(id);
    if (!asset) {
      throw new NotFoundException(`Could not find Asset with id: ${id}`);
    }

    return asset;
  }

  async link(id: number, mesh: Mesh, linkingStatus: LinkingStatus) {
    return this.assetsRepository.link(id, mesh, linkingStatus);
  }

  async changeLinkingStatus(id: number, linkingStatus: LinkingStatus) {
    return this.assetsRepository.changeLinkingStatus(id, linkingStatus);
  }

  async createOrUpdateAsset(netilionResponseDto: NetilionResponseDto, model: Model): Promise<void> {
    const asset = await this.assetsRepository.findOne(netilionResponseDto.id);
    const status = await this.statusService.getOrCreateStatus(netilionResponseDto.status);
    const product = await this.productService.getOrCreateProduct(netilionResponseDto.product);
    const tag = await this.tagService.getOrCreateTag(netilionResponseDto);

    if (asset) {
      await this.assetsRepository.updateAsset(netilionResponseDto, status, product, tag);
    } else {
      await this.assetsRepository.createAsset(netilionResponseDto, status, product, tag, model);
    }
  }

  async getAssetsOfModel(modelId: number): Promise<Asset[]> {
    return this.assetsRepository.getAssetsOfModel(modelId);
  }
}
