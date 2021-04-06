import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from './dto/product.dto';
import { ProductRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductRepository)
    private readonly productRepository: ProductRepository
  ) {}

  async getOrCreateProduct(productDto: ProductDto) {
    let product = await this.productRepository.findOne(productDto.id);
    if (!product) {
      product = await this.productRepository.createProduct(productDto);
    } else {
      product = await this.productRepository.updateProduct(productDto);
    }

    return product;
  }
}
