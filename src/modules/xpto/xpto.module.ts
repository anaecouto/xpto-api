import { Module } from '@nestjs/common';
import { PrismaRepository } from 'src/shared/infra/database/prisma/PrismaRepository';
import CustomerQuery from './application/query/CustomerQuery';
import ProductQuery from './application/query/ProductQuery';
import ProductsCustomerQuery from './application/query/ProductsCustomerQuery';
import { FilterCustomerPurchasesByDayUseCase } from './application/useCase/FilterCustomerPurchasesByDayUseCase';
import { FilterCustomerPurchasesByMonthUseCase } from './application/useCase/FilterCustomerPurchasesByMonthUseCase';
import { FilterCustomerPurchasesByYearUseCase } from './application/useCase/FilterCustomerPurchasesByYearUseCase';
import { ListCustomerPurchasesByCustomerIdUseCase } from './application/useCase/ListCustomerPurchasesByCustomerIdUseCase';
import { ListCustomersWhoSpentMostByDayUseCase } from './application/useCase/ListCustomersWhoSpentMostByDayUseCase';
import { ListCustomersWhoSpentMostByMonthUseCase } from './application/useCase/ListCustomersWhoSpentMostByMonthUseCase';
import { ListCustomersWhoSpentMostByYearUseCase } from './application/useCase/ListCustomersWhoSpentMostByYearUseCase';
import { ListMostSoldPurchasesByDayUseCase } from './application/useCase/ListMostSoldPurchasesByDayUseCase';
import { ListMostSoldPurchasesByMonthUseCase } from './application/useCase/ListMostSoldPurchasesByMonthUseCase';
import { ListMostSoldPurchasesByYearUseCase } from './application/useCase/ListMostSoldPurchasesByYearUseCase';
import { PurchaseProductsUseCase } from './application/useCase/PurchaseProductsUseCase';
import { CustomerController } from './infra/controller/Customer.controller';
import { ProductController } from './infra/controller/Product.controller';
import { ProductsCustomerController } from './infra/controller/ProductsCustomers.controller';
import { CustomerRepository } from './infra/repository/CustomerRepository';
import { ProductRepository } from './infra/repository/ProductRepository';
import { ProductsCustomerRepository } from './infra/repository/ProductsCustomerRepository';

@Module({
  imports: [],
  controllers: [
    CustomerController,
    ProductController,
    ProductsCustomerController,
  ],
  providers: [
    ProductsCustomerRepository,
    PrismaRepository,
    CustomerRepository,
    CustomerQuery,
    ProductRepository,
    ProductQuery,
    PurchaseProductsUseCase,
    ListCustomerPurchasesByCustomerIdUseCase,
    FilterCustomerPurchasesByDayUseCase,
    FilterCustomerPurchasesByMonthUseCase,
    FilterCustomerPurchasesByYearUseCase,
    ListMostSoldPurchasesByDayUseCase,
    ListMostSoldPurchasesByMonthUseCase,
    ListMostSoldPurchasesByYearUseCase,
    ListCustomersWhoSpentMostByDayUseCase,
    ListCustomersWhoSpentMostByMonthUseCase,
    ListCustomersWhoSpentMostByYearUseCase,
    ProductsCustomerQuery,
  ],
})
export class XptoModule {}
