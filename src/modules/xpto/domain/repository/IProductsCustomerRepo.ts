import { ProductsCustomerDomain } from '../entity/ProductsCustomerDomain';

// import { ProductsCustomer } from '@prisma/client';
export interface IProductsCustomerRepo {
  paginate({ options: IPaginationOptions, where: any }): Promise<any>;
  save(
    productsCustomer: ProductsCustomerDomain,
  ): Promise<ProductsCustomerDomain>;
  filterPurchasesById(id: string): Promise<ProductsCustomerDomain[]>;
  listAllPurchasesByDay(day: string): Promise<ProductsCustomerDomain[]>;
  listAllPurchasesByMonth(month: string): Promise<ProductsCustomerDomain[]>;
  listAllPurchasesByYear(year: string): Promise<ProductsCustomerDomain[]>;
}
