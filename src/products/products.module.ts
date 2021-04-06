import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
