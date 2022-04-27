import { Inject } from '@nestjs/common';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListMostSoldPurchasesByYearUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(year: string) {
    const allProductsList =
      await this.productsCustomerRepository.listAllPurchasesByYear(year);

    const allProductsListDTO = allProductsList.map((purchase) => {
      return {
        productId: purchase.productId,
        productName: purchase.productName,
        quantity: purchase.quantity,
      };
    });

    const mostSoldProductsByYearList = allProductsListDTO.sort((a, b) => {
      return b.quantity - a.quantity;
    });

    return mostSoldProductsByYearList;
  }
}
