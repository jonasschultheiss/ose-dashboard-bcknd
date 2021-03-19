import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(productDto: ProductDto): Promise<Product> {
    const { id, name, product_code, manufacturer } = productDto;

    const product = new Product();
    product.id = id;
    product.name = name;
    product.code = product_code;
    product.manufacturer = manufacturer.name;

    try {
      await product.save();
      return product;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Product with the same code already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateProduct(productDto: ProductDto): Promise<Product> {
    const { id, name, product_code, manufacturer } = productDto;
    const product = await this.findOne(id);
    let needsSave = false;
    if (product.name !== name) {
      product.name = name;
      needsSave = true;
    }

    if (product.code !== product_code) {
      product.code = product_code;
      needsSave = true;
    }

    if (product.manufacturer !== manufacturer.name) {
      product.manufacturer = manufacturer.name;
      needsSave = true;
    }

    if (needsSave) {
      try {
        await product.save();
        return product;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    } else {
      return product;
    }
  }
}
