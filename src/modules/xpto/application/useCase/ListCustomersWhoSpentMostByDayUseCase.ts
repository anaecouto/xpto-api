import { Inject } from '@nestjs/common';
import { GroupArrayByUtils } from 'src/shared/utils/GroupArrayByUtils';
import { GroupByUtils } from 'src/shared/utils/GroupByUtils';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class ListCustomersWhoSpentMostByDayUseCase {
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
      const customerDTO = {
        customerId: purchase.customerId,
        customerCpf: purchase.customerCpf,
        totalValue: purchase.totalValue,
      };
      return customerDTO;
    });

    const productsGroupedByCustomerId =
      GroupByUtils.groupBy(allProductsListDTO);

    const valuesArray = GroupArrayByUtils.groupArrayBy(
      productsGroupedByCustomerId,
    );

    const clientsThatSpentMostList = valuesArray.sort((a, b) => {
      return b.totalValue - a.totalValue;
    });

    return clientsThatSpentMostList;
  }
}
