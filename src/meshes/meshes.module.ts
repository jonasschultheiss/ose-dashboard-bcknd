import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeshesController } from './meshes.controller';
import { MeshesRepository } from './meshes.repository';
import { MeshesService } from './meshes.service';

@Module({
  imports: [TypeOrmModule.forFeature([MeshesRepository])],
  providers: [MeshesService],
  controllers: [MeshesController],
  exports: [MeshesService]
})
export class MeshesModule {}
