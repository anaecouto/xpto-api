import { Inject } from '@nestjs/common';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListMostSoldPurchasesByMonthUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(month: string) {
    const allProductsList =
      await this.productsCustomerRepository.listAllPurchasesByMonth(month);

    const allProductsListDTO = allProductsList.map((purchase) => {
      return {
        productId: purchase.productId,
        productName: purchase.productName,
        quantity: purchase.quantity,
      };
    });

    const mostSoldProductsByMonthList = allProductsListDTO.sort((a, b) => {
      return b.quantity - a.quantity;
    });

    return mostSoldProductsByMonthList;
  }
}
