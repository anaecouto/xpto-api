import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import AppError from 'src/shared/core/errors/AppError';
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
    try {
      return await this.productRepository.findById(id);
    } catch (e) {
      throw new AppError('Produto inexistente', { status: 400 });
    }
  }

  async updateProduct(id: string, params: ProductDTO): Promise<ProductDomain> {
    try {
      return await this.productRepository.update(id, params as ProductDomain);
    } catch (e) {
      throw new AppError('Produto inexistente', { status: 400 });
    }
  }

  async deleteProduct(id: string) {
    try {
      await this.productRepository.delete(id);
    } catch (e) {
      throw new AppError('Produto inexistente', { status: 400 });
    }
  }
}
