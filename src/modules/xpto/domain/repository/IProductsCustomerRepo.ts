import { ProductsCustomerDomain } from '../entity/ProductsCustomerDomain';

// import { ProductsCustomer } from '@prisma/client';
export interface IProductsCustomerRepo {
  paginate({ options: IPaginationOptions, where: any }): Promise<any>;
  save(
    productsCustomer: ProductsCustomerDomain,
  ): Promise<ProductsCustomerDomain>;
  filterPurchasesById(id: string): Promise<ProductsCustomerDomain[]>;
  listAllPurchasesByDay(
    day: string,
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]>;
  listAllPurchasesByMonth(
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]>;
  listAllPurchasesByYear(year: string): Promise<ProductsCustomerDomain[]>;
}
