import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { ProductsService } from 'src/products/products.service';
import { StatusService } from 'src/status/status.service';
import { TagsService } from 'src/tags/tags.service';
import { AssetsRepository } from './assets.repository';
import { NetilionResponseDto } from './dto/netilion-response.dto';
import { Asset } from './entities/asset.entity';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(AssetsRepository)
    private readonly assetsRepository: AssetsRepository,
    private readonly netilionRequestService: NetilionRequestService,
    private readonly statusService: StatusService,
    private readonly productService: ProductsService,
    private readonly tagService: TagsService,
  ) {}

  @Cron('30 * * * * *')
  async handleCron() {
    const assets: NetilionResponseDto[] = await this.netilionRequestService.getAssets();
    assets.map((asset) => {
      this.createOrUpdateAsset(asset);
    });
  }

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

  private async createOrUpdateAsset(netilionResponseDto: NetilionResponseDto): Promise<void> {
    const asset = await this.assetsRepository.findOne(netilionResponseDto.id);
    const status = await this.statusService.getOrCreateStatus(netilionResponseDto.status);
    const product = await this.productService.getOrCreateProduct(netilionResponseDto.product);
    const tag = await this.tagService.getOrCreateTag(netilionResponseDto);

    if (asset) {
      await this.assetsRepository.updateAsset(netilionResponseDto, status, product, tag);
    } else {
      await this.assetsRepository.createAsset(netilionResponseDto, status, product, tag);
    }
  }
}
