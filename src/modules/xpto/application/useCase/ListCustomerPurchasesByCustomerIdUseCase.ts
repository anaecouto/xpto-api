import { Inject } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { ICustomerRepo } from '../../domain/repository/ICustomerRepo';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { CustomerRepository } from '../../infra/repository/CustomerRepository';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListCustomerPurchasesByCustomerIdUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
    @Inject(CustomerRepository)
    private customerRepository: ICustomerRepo,
  ) {}

  async execute(customerId: string): Promise<ProductsCustomerDomain[]> {
    try {
      await this.customerRepository.findById(customerId);
      return await this.productsCustomerRepository.listCustomerPurchases(
        customerId,
      );
    } catch (e) {
      throw new AppError('Cliente inválido', { status: 404 });
    }
  }
}
