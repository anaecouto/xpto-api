import { Inject, Injectable } from '@nestjs/common';
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
    return this.productsCustomerRepository.findById(id);
  }

  async listAllPurchases(): Promise<ProductsCustomerDomain[]> {
    return this.productsCustomerRepository.listAllPurchases();
  }

  async deletePurchase(id: string) {
    this.productsCustomerRepository.delete(id);
  }
}
