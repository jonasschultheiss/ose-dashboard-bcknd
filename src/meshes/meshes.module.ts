import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshesRepository } from './meshes.repository';
import { MeshesService } from './meshes.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeshesRepository])],
  providers: [MeshesService],
  exports: [MeshesService]
})
export class MeshesModule {}
