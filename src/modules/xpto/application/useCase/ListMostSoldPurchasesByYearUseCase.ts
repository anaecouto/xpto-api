import { Inject } from '@nestjs/common';
import { GroupMostSoldArrayUtils } from 'src/shared/utils/GroupMostSoldArrayUtils';
import { GroupMostSoldUtils } from 'src/shared/utils/GroupMostSoldUtils';
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

    const mostSoldProductsByYear =
      GroupMostSoldUtils.groupBy(allProductsListDTO);

    const productsArray = GroupMostSoldArrayUtils.groupArrayBy(
      mostSoldProductsByYear,
    );

    const mostSoldProductsByYearList =
      SortArrayByDescendingUtils.sortDescending(productsArray, 'quantity');

    return mostSoldProductsByYearList;
  }
}
