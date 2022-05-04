import { Inject } from '@nestjs/common';
import { GroupByUtils } from 'src/shared/utils/GroupByUtils';
import { GroupProductsArrayUtils } from 'src/shared/utils/GroupProductsArrayUtils';
import { SortArrayByDescendingUtils } from 'src/shared/utils/SortArrayByDescendingUtils';
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

    const mostSoldProductsByYear = GroupByUtils.groupBy(
      allProductsListDTO,
      'productId',
    );

    const productsArray = GroupProductsArrayUtils.groupArrayBy(
      mostSoldProductsByYear,
    );

    const mostSoldProductsByYearList =
      SortArrayByDescendingUtils.sortDescending(productsArray, 'quantity');

    return mostSoldProductsByYearList;
  }
}
