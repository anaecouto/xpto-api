import { Inject } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class FilterCustomerPurchasesByYearUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(id: string, year: string): Promise<ProductsCustomerDomain[]> {
    try {
      const purchasesByYear =
        await this.productsCustomerRepository.listAllPurchasesByYear(year);

      return purchasesByYear.filter((purchase) => purchase.customerId === id);
    } catch (e) {
      throw new AppError('Cliente inválido', { status: 400 });
    }
  }
}
