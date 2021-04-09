import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetilionRequestModule } from 'src/netilion-request/netilion-request.module';
import { UsersModule } from 'src/users/users.module';
import { ModelsController } from './models.controller';
import { ModelsRepository } from './models.repository';
import { ModelsService } from './models.service';

@Module({
  imports: [NetilionRequestModule, UsersModule, TypeOrmModule.forFeature([ModelsRepository])],
  controllers: [ModelsController],
  providers: [ModelsService]
})
export class ModelsModule {}
