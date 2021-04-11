import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mesh } from './entities/mesh.entity';
import { MeshesRepository } from './meshes.repository';

@Injectable()
export class MeshesService {
  constructor(
    @InjectRepository(MeshesRepository)
    private readonly meshesRepository: MeshesRepository
  ) {}

  async findOne(name: string): Promise<Mesh> {
    return this.meshesRepository.findOne({ name });
  }

  async findAll(): Promise<Mesh[]> {
    return this.meshesRepository.find();
  }
}
