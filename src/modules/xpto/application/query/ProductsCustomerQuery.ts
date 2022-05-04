import { Inject, Injectable } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

@Injectable()
export default class ProductsCustomerQuery {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async findById(id: string): Promise<ProductsCustomerDomain> {
    try {
      return await this.productsCustomerRepository.findById(id);
    } catch (e) {
      throw new AppError('Essa compra não existe', { status: 404 });
    }
  }

  async listAllPurchases(): Promise<ProductsCustomerDomain[]> {
    return await this.productsCustomerRepository.listAllPurchases();
  }

  async deletePurchase(id: string) {
    try {
      await this.productsCustomerRepository.delete(id);
    } catch (e) {
      throw new AppError('Essa compra não existe', { status: 404 });
    }
  }
}
