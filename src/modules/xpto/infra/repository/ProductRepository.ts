import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/core/BaseRepository';
import { PrismaRepository } from 'src/shared/infra/database/prisma/PrismaRepository';
import { ProductMapper } from '../../application/mappers/ProductMapper';
import { ProductDomain } from '../../domain/entity/ProductDomain';
import { IProductRepo } from '../../domain/repository/IProductRepo';

@Injectable()
export class ProductRepository extends BaseRepository implements IProductRepo {
  constructor(private prismaRepository: PrismaRepository) {
    super(prismaRepository, 'products');
  }

  async save(product: ProductDomain): Promise<ProductDomain> {
    const toPersistence = ProductMapper.toPersistence(product);
    const savedProduct = await this.prismaRepository.product.create({
      data: toPersistence,
    });
    return ProductMapper.toDomain(savedProduct);
  }

  async findById(id: string): Promise<ProductDomain> {
    const productEntity = await this.prismaRepository.product.findUnique({
      where: {
        id,
      },
    });

    return ProductMapper.toDomain(productEntity);
  }

  async update(
    id: string,
    updateParams: ProductDomain,
  ): Promise<ProductDomain> {
    const productDomain = ProductMapper.toPersistence(updateParams);
    const updatedProduct = await this.prismaRepository.product.update({
      where: { id },
      data: productDomain,
    });

    return ProductMapper.toDomain(updatedProduct);
  }

  async delete(id: string) {
    await this.prismaRepository.product.delete({
      where: { id },
    });
  }

  async purchaseAndUpdateProductQuantity(productId: string, quantity: number) {
    const productFound = await this.prismaRepository.product.findUnique({
      where: {
        id: productId,
      },
    });

    const productDomain = ProductMapper.toDomain(productFound);
    const oldQuantity = productDomain.quantity;

    await this.prismaRepository.product.update({
      where: { id: productId },
      data: { quantity: oldQuantity - quantity },
    });
  }
}
