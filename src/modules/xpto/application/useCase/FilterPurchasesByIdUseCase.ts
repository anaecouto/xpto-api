import { Inject } from '@nestjs/common';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class FilterPurchasesByIdUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(id: string): Promise<ProductsCustomerDomain[]> {
    return this.productsCustomerRepository.filterPurchasesById(id);
  }
}
