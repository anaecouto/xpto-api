import { Inject } from '@nestjs/common';
import { GroupMostSoldArrayUtils } from 'src/shared/utils/GroupMostSoldArrayUtils';
import { GroupMostSoldUtils } from 'src/shared/utils/GroupMostSoldUtils';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListMostSoldPurchasesByDayUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(day: string, month: string, year: string) {
    const allProductsList =
      await this.productsCustomerRepository.listAllPurchasesByDay(
        day,
        month,
        year,
      );

    const allProductsListDTO = allProductsList.map((purchase) => {
      return {
        productId: purchase.productId,
        productName: purchase.productName,
        quantity: purchase.quantity,
      };
    });

    const mostSoldProductsByDay =
      GroupMostSoldUtils.groupBy(allProductsListDTO);

    const productsArray = GroupMostSoldArrayUtils.groupArrayBy(
      mostSoldProductsByDay,
    );

    const mostSoldProductsByDayList = productsArray.sort((a, b) => {
      return b.quantity - a.quantity;
    });

    return mostSoldProductsByDayList;
  }
}
