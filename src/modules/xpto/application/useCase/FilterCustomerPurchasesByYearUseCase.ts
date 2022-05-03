import { Inject } from '@nestjs/common';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class FilterCustomerPurchasesByYearUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(id: string, year: string): Promise<ProductsCustomerDomain[]> {
    const purchasesByYear =
      await this.productsCustomerRepository.listAllPurchasesByYear(year);

    return purchasesByYear.filter((purchase) => purchase.customerId === id);
  }
}
