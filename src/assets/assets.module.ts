import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NetilionRequestModule } from 'src/netilion-request/netilion-request.module';
import { ProductsModule } from 'src/products/products.module';
import { StatusModule } from 'src/status/status.module';
import { TagsModule } from 'src/tags/tags.module';
import { AssetsController } from './assets.controller';
import { AssetsRepository } from './assets.repository';
import { AssetsService } from './assets.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AssetsRepository]),
    NetilionRequestModule,
    StatusModule,
    ProductsModule,
    TagsModule
  ],
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
