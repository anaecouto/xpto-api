import { Inject } from '@nestjs/common';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class FilterCustomerPurchasesByDayUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(
    id: string,
    day: string,
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const productsCustomers =
      await this.productsCustomerRepository.filterPurchasesById(id);

    return this.filterPurchasesByCustomerAndDay(
      day,
      month,
      year,
      productsCustomers,
    );
  }

  private filterPurchasesByCustomerAndDay(
    day: string,
    month: string,
    year: string,
    purchasesDomain: ProductsCustomerDomain[],
  ) {
    return purchasesDomain.filter((customerPurchasesByDay) => {
      return (
        customerPurchasesByDay.created_at.getDate() === parseInt(day) &&
        customerPurchasesByDay.created_at.getMonth() + 1 === parseInt(month) &&
        customerPurchasesByDay.created_at.getFullYear() === parseInt(year)
      );
    });
  }
}
