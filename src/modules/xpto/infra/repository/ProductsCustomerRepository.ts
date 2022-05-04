import { Injectable } from '@nestjs/common';
import { ProductsCustomer } from '@prisma/client';
import { BaseRepository } from 'src/shared/core/BaseRepository';
import { PrismaRepository } from 'src/shared/infra/database/prisma/PrismaRepository';
import { ProductsCustomerMapper } from '../../application/mappers/ProductsCustomerMapper';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';

@Injectable()
export class ProductsCustomerRepository
  extends BaseRepository
  implements IProductsCustomerRepo
{
  constructor(private prismaRepository: PrismaRepository) {
    super(prismaRepository, 'products_customers');
  }

  async save(
    productsCustomer: ProductsCustomerDomain,
  ): Promise<ProductsCustomerDomain> {
    const toPersistence =
      ProductsCustomerMapper.toPersistence(productsCustomer);
    const savedProductsCustomer =
      await this.prismaRepository.productsCustomer.create({
        data: toPersistence,
      });
    return ProductsCustomerMapper.toDomain(savedProductsCustomer);
  }

  async listAllPurchases(): Promise<ProductsCustomerDomain[]> {
    const purchases = await this.prismaRepository.productsCustomer.findMany();

    const purchasesDomain = purchases.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain;
  }

  async findById(id: string): Promise<ProductsCustomerDomain> {
    const purchase = await this.prismaRepository.productsCustomer.findUnique({
      where: { id },
    });

    return ProductsCustomerMapper.toDomain(purchase);
  }

  async delete(id: string) {
    await this.prismaRepository.productsCustomer.delete({
      where: { id },
    });
  }

  async listAllPurchasesByDay(
    day: string,
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const result: ProductsCustomer[] = await this.prisma
      .$queryRaw`with newTable as (select id, "productId", "productName", "customerId", "totalValue", 
      quantity, extract(year from created_at) as year,
      extract(month from created_at) as month, 
      extract(day from created_at) as day from products_customers)
      select * from newTable where day = ${parseInt(day)} 
      and year = ${parseInt(year)} and month = ${parseInt(month)}`;

    const purchasesDomain = result.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain;
  }

  async listAllPurchasesByMonth(
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const result: ProductsCustomer[] = await this.prisma
      .$queryRaw`with newTable as (select id, "productId", "productName", "customerId", "totalValue", 
      quantity, extract(year from created_at) as year,
      extract(month from created_at) as month, 
      extract(day from created_at) as day from products_customers)
      select * from newTable where year = ${parseInt(year)} 
      and month = ${parseInt(month)}`;

    const purchasesDomain = result.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain;
  }

  async listAllPurchasesByYear(
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const result: ProductsCustomer[] = await this.prisma
      .$queryRaw`with newTable as (select id, "productId", "productName", "customerId", "totalValue",
      quantity, extract(year from created_at) as year,
      extract(month from created_at) as month, 
      extract(day from created_at) as day from products_customers)
      select * from newTable where year = ${parseInt(year)}`;

    const purchasesDomain = result.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain;
  }
}
