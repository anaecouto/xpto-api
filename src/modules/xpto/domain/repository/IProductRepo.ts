import { ProductDomain } from '../entity/ProductDomain';

export interface IProductRepo {
  paginate({ options: IPaginationOptions, where: any }): Promise<any>;
  save(product: ProductDomain): Promise<ProductDomain>;
  findById(id: string): Promise<ProductDomain>;
  update(id: string, updateParams: ProductDomain): Promise<ProductDomain>;
  delete(id: string);
  purchaseAndUpdateProductQuantity(productId: string, quantity: number);
}
