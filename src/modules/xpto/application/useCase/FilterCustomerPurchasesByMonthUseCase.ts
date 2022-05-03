import { Inject } from '@nestjs/common';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class FilterCustomerPurchasesByMonthUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(
    id: string,
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const purchasesByMonth =
      await this.productsCustomerRepository.listAllPurchasesByMonth(
        month,
        year,
      );

    return purchasesByMonth.filter((purchase) => purchase.customerId === id);
  }
}
