import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { OAuthService } from 'src/netilion-request/oauth.service';
import { User } from 'src/users/entities/user.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';
import { ModelsRepository } from './models.repository';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(ModelsRepository)
    private readonly modelsRepository: ModelsRepository,
    private oauthService: OAuthService,
    private netilionRequestService: NetilionRequestService
  ) {}

  async create(createModelDto: CreateModelDto, user: User): Promise<Model> {
    return this.modelsRepository.createModel(createModelDto, user);
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
}
