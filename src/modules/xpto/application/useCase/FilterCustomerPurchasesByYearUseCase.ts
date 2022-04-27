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
    const productsCustomers =
      await this.productsCustomerRepository.filterPurchasesById(id);

    return this.filterPurchasesByCustomerAndYear(year, productsCustomers);
  }

  private filterPurchasesByCustomerAndYear(
    year: string,
    purchasesDomain: ProductsCustomerDomain[],
  ) {
    return purchasesDomain.filter((customerPurchasesByYear) => {
      return (
        customerPurchasesByYear.created_at.getFullYear() === parseInt(year)
      );
    });
  }
}
