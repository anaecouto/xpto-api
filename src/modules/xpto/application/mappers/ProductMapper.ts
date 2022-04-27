import { Product, Prisma } from '@prisma/client';
import { ProductDomain, ProductProps } from '../../domain/entity/ProductDomain';

export class ProductMapper {
  static toDomain(dbProduct: Product): ProductDomain {
    const productProps = {
      name: dbProduct.name,
      quantity: dbProduct.quantity,
      price: dbProduct.price,
    } as ProductProps;

    return ProductDomain.create(productProps, dbProduct.id);
  }

  static toPersistence(product: ProductDomain): Prisma.ProductCreateInput {
    const dbProduct = {
      id: product._id,
      name: product.name,
      quantity: product.quantity,
      price: product.price,
    } as Prisma.ProductCreateInput;

    return dbProduct;
  }
}
