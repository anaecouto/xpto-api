import { Inject } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { ICustomerRepo } from '../../domain/repository/ICustomerRepo';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { CustomerRepository } from '../../infra/repository/CustomerRepository';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class FilterCustomerPurchasesByDayUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
    @Inject(CustomerRepository)
    private customerRepository: ICustomerRepo,
  ) {}

  async execute(
    id: string,
    day: string,
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    try {
      await this.customerRepository.findById(id);
      const purchasesByDay =
        await this.productsCustomerRepository.listAllPurchasesByDay(
          day,
          month,
          year,
        );

      return purchasesByDay.filter((purchase) => purchase.customerId === id);
    } catch (e) {
      throw new AppError('Cliente inválido', { status: 400 });
    }
  }
}
