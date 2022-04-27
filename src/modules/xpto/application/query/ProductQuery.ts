import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { ProductDomain } from '../../domain/entity/ProductDomain';
import { IProductRepo } from '../../domain/repository/IProductRepo';
import { ProductDTO } from '../../infra/controller/dtos/ProductDTO';
import { ProductRepository } from '../../infra/repository/ProductRepository';
import { ProductMapper } from '../mappers/ProductMapper';

@Injectable()
export default class ProductQuery {
  constructor(
    @Inject(ProductRepository)
    private productRepository: IProductRepo,
  ) {}

  async createProduct(productDTO: ProductDTO): Promise<ProductDomain> {
    const productDomain = ProductMapper.toDomain(productDTO as Product);
    return await this.productRepository.save(productDomain);
  }

  async findById(id: string): Promise<ProductDomain> {
    return this.productRepository.findById(id);
  }

  async updateProduct(id: string, params: ProductDTO): Promise<ProductDomain> {
    return this.productRepository.update(id, params as ProductDomain);
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}
