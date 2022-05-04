import { Inject } from '@nestjs/common';
import { GroupByUtils } from 'src/shared/utils/GroupByUtils';
import { GroupProductsArrayUtils } from 'src/shared/utils/GroupProductsArrayUtils';
import { SortArrayByDescendingUtils } from 'src/shared/utils/SortArrayByDescendingUtils';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListMostSoldPurchasesByMonthUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(month: string, year: string) {
    const allProductsList =
      await this.productsCustomerRepository.listAllPurchasesByMonth(
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

    const mostSoldProductsByMonth = GroupByUtils.groupBy(
      allProductsListDTO,
      'productId',
    );

    const productsArray = GroupProductsArrayUtils.groupArrayBy(
      mostSoldProductsByMonth,
    );

    const mostSoldProductsByMonthList =
      SortArrayByDescendingUtils.sortDescending(productsArray, 'quantity');

    return mostSoldProductsByMonthList;
  }
}
