import { Inject } from '@nestjs/common';
import { GroupByUtils } from 'src/shared/utils/GroupByUtils';
import { GroupCustomersArrayByUtils } from 'src/shared/utils/GroupCustomersArrayByUtils';
import { SortArrayByDescendingUtils } from 'src/shared/utils/SortArrayByDescendingUtils';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListCustomersWhoSpentMostByYearUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
  ) {}

  async execute(year: string) {
    const allProductsList =
      await this.productsCustomerRepository.listAllPurchasesByYear(year);

    const allProductsListDTO = allProductsList.map((purchase) => {
      const customerDTO = {
        customerId: purchase.customerId,
        customerCpf: purchase.customerCpf,
        totalValue: purchase.totalValue,
      };
      return customerDTO;
    });

    const productsGroupedByCustomerId = GroupByUtils.groupBy(
      allProductsListDTO,
      'customerId',
    );

    const valuesArray = GroupCustomersArrayByUtils.groupArrayBy(
      productsGroupedByCustomerId,
    );

    const clientsThatSpentMostList = SortArrayByDescendingUtils.sortDescending(
      valuesArray,
      'totalValue',
    );

    return clientsThatSpentMostList;
  }
}
