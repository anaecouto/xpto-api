import { Injectable } from '@nestjs/common';
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

  async filterPurchasesById(id: string): Promise<ProductsCustomerDomain[]> {
    const purchases = await this.prismaRepository.productsCustomer.findMany({
      where: { customerId: id },
    });

    const purchasesDomain = purchases.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain;
  }

  async listAllPurchasesByDay(
    day: string,
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const purchasesList =
      await this.prismaRepository.productsCustomer.findMany();

    const purchasesDomain = purchasesList.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain.filter((purchases) => {
      return (
        purchases.created_at.getDate() === parseInt(day) &&
        purchases.created_at.getMonth() + 1 === parseInt(month) &&
        purchases.created_at.getFullYear() === parseInt(year)
      );
    });
  }

  async listAllPurchasesByMonth(
    month: string,
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const purchasesList =
      await this.prismaRepository.productsCustomer.findMany();

    const purchasesDomain = purchasesList.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain.filter((purchases) => {
      return (
        purchases.created_at.getMonth() + 1 === parseInt(month) &&
        purchases.created_at.getFullYear() === parseInt(year)
      );
    });
  }

  async listAllPurchasesByYear(
    year: string,
  ): Promise<ProductsCustomerDomain[]> {
    const purchasesList =
      await this.prismaRepository.productsCustomer.findMany();

    const purchasesDomain = purchasesList.map((purchase) => {
      return ProductsCustomerMapper.toDomain(purchase);
    });

    return purchasesDomain.filter((purchases) => {
      return purchases.created_at.getFullYear() === parseInt(year);
    });
  }
}
