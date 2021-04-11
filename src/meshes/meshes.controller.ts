import { Controller, Get } from '@nestjs/common';
import { Mesh } from './entities/mesh.entity';
import { MeshesService } from './meshes.service';

@Controller('meshes')
export class MeshesController {
  constructor(private readonly meshesService: MeshesService) {}

  @Get()
  findAll(): Promise<Mesh[]> {
    return this.meshesService.findAll();
  }
}
