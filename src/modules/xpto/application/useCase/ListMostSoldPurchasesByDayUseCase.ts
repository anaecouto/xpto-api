import { Inject } from '@nestjs/common';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListMostSoldPurchasesByDayUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(day: string) {
    const allProductsList =
      await this.productsCustomerRepository.listAllPurchasesByDay(day);

    const allProductsListDTO = allProductsList.map((purchase) => {
      return {
        productId: purchase.productId,
        productName: purchase.productName,
        quantity: purchase.quantity,
      };
    });

    const mostSoldProductsByDayList = allProductsListDTO.sort((a, b) => {
      return b.quantity - a.quantity;
    });

    return mostSoldProductsByDayList;
  }
}
