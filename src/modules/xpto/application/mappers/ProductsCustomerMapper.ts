import { Prisma, ProductsCustomer } from '@prisma/client';
import {
  ProductsCustomerDomain,
  ProductsCustomerProps,
} from '../../domain/entity/ProductsCustomerDomain';

export class ProductsCustomerMapper {
  static toDomain(
    dbProductsCustomer: ProductsCustomer,
  ): ProductsCustomerDomain {
    const productCustomerProps = {
      productId: dbProductsCustomer.productId,
      productName: dbProductsCustomer.productName,
      quantity: dbProductsCustomer.quantity,
      totalValue: dbProductsCustomer.totalValue,
      customerId: dbProductsCustomer.customerId,
      customerCpf: dbProductsCustomer.customerCpf,
      created_at: dbProductsCustomer.created_at,
      updated_at: dbProductsCustomer.updated_at,
    } as ProductsCustomerProps;

    return ProductsCustomerDomain.create(
      productCustomerProps,
      dbProductsCustomer.id,
    );
  }

  static toPersistence(
    productCustomer: ProductsCustomerDomain,
  ): Prisma.ProductsCustomerCreateInput {
    const product = productCustomer.productId
      ? {
          connect: { id: productCustomer.productId },
        }
      : {};

    const customer = productCustomer.customerId
      ? {
          connect: { id: productCustomer.customerId },
        }
      : {};

    const dbProductsCustomer = {
      id: productCustomer._id,
      productName: productCustomer.productName,
      quantity: productCustomer.quantity,
      totalValue: productCustomer.totalValue,
      customerCpf: productCustomer.customerCpf,
      created_at: productCustomer.created_at,
      updated_at: new Date(),
      product,
      customer,
    } as Prisma.ProductsCustomerCreateInput;

    return dbProductsCustomer;
  }
}
