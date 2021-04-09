import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Model } from 'src/models/entities/model.entity';
import { Product } from 'src/products/entities/product.entity';
import { Status } from 'src/status/entities/status.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NetilionResponseDto } from './dto/netilion-response.dto';
import { Asset } from './entities/asset.entity';
import getMonths from './utils/getMonths.util';

@EntityRepository(Asset)
export class AssetsRepository extends Repository<Asset> {
  async createAsset(
    netilionResponseDto: NetilionResponseDto,
    status: Status,
    product: Product,
    tag: Tag,
    model: Model
  ): Promise<Asset> {
    const { id, serial_number, production_date, last_seen_at } = netilionResponseDto;
    const months = getMonths();
    const asset = new Asset();
    asset.id = id;
    asset.lastSeen = last_seen_at;
    asset.productionDate = null;
    if (production_date) {
      asset.productionDate = `${months[new Date(production_date).getMonth()]} ${new Date(
        production_date
      ).getFullYear()}`;
    }

    asset.serialNumber = serial_number;
    asset.status = status;
    asset.product = product;
    asset.tag = tag;
    asset.model = model;
    try {
      await asset.save();
      return asset;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Asset with the same serial number already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async getAssetsOfModel(modelId: number): Promise<Asset[]> {
    return this.createQueryBuilder('asset').where('asset.modelId = :id', { id: modelId }).getMany();
  }

  async updateAsset(
    netilionResponseDto: NetilionResponseDto,
    status: Status,
    product: Product,
    tag: Tag
  ): Promise<Asset> {
    const { id, serial_number, production_date, last_seen_at } = netilionResponseDto;
    const asset = await this.findOne(id);
    let needsSave = false;
    if (asset.serialNumber !== serial_number) {
      asset.serialNumber = serial_number;
      needsSave = true;
    }

    if (asset.productionDate !== production_date) {
      asset.productionDate = production_date;
      needsSave = true;
    }

    if (asset.lastSeen !== last_seen_at) {
      asset.lastSeen = last_seen_at;
      needsSave = true;
    }

    if (asset.status.id !== status.id) {
      asset.status = status;
      needsSave = true;
    }

    if (asset.product.id !== product.id) {
      asset.product = product;
      needsSave = true;
    }

    if (!asset.tag || asset.tag.id !== tag.id) {
      asset.tag = tag;
      needsSave = true;
    }

    if (needsSave) {
      try {
        await asset.save();
        return asset;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    } else {
      return asset;
    }
  }
}
