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
    const productsCustomers =
      await this.productsCustomerRepository.filterPurchasesById(id);

    return this.filterPurchasesByCustomerAndMonth(
      month,
      year,
      productsCustomers,
    );
  }

  private filterPurchasesByCustomerAndMonth(
    month: string,
    year: string,
    purchasesDomain: ProductsCustomerDomain[],
  ) {
    return purchasesDomain.filter((customerPurchasesByMonth) => {
      return (
        customerPurchasesByMonth.created_at.getMonth() + 1 ===
          parseInt(month) &&
        customerPurchasesByMonth.created_at.getFullYear() === parseInt(year)
      );
    });
  }
}
