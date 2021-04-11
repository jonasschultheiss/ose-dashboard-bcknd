import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsModule } from 'src/assets/assets.module';
import { MeshesModule } from 'src/meshes/meshes.module';
import { NetilionRequestModule } from 'src/netilion-request/netilion-request.module';
import { UsersModule } from 'src/users/users.module';
import { ModelsController } from './models.controller';
import { ModelsRepository } from './models.repository';
import { ModelsService } from './models.service';

@Module({
  imports: [
    NetilionRequestModule,
    ConfigModule,
    UsersModule,
    AssetsModule,
    MeshesModule,
    TypeOrmModule.forFeature([ModelsRepository])
  ],
  controllers: [ModelsController],
  providers: [ModelsService]
})
export class ModelsModule {}
