import { Module } from '@nestjs/common';
import { PrismaRepository } from 'src/shared/infra/database/prisma/PrismaRepository';
import CustomerQuery from './application/query/CustomerQuery';
import ProductQuery from './application/query/ProductQuery';
import { FilterCustomerPurchasesByDayUseCase } from './application/useCase/FilterCustomerPurchasesByDayUseCase';
import { FilterCustomerPurchasesByMonthUseCase } from './application/useCase/FilterCustomerPurchasesByMonthUseCase';
import { FilterCustomerPurchasesByYearUseCase } from './application/useCase/FilterCustomerPurchasesByYearUseCase';
import { FilterPurchasesByIdUseCase } from './application/useCase/FilterPurchasesByIdUseCase';
import { ListCustomersWhoSpentMostByDayUseCase } from './application/useCase/ListCustomersWhoSpentMostByDayUseCase';
import { ListMostSoldPurchasesByDayUseCase } from './application/useCase/ListMostSoldPurchasesByDayUseCase';
import { ListMostSoldPurchasesByMonthUseCase } from './application/useCase/ListMostSoldPurchasesByMonthUseCase';
import { ListMostSoldPurchasesByYearUseCase } from './application/useCase/ListMostSoldPurchasesByYearUseCase';
import { PurchaseProductsUseCase } from './application/useCase/PurchaseProductsUseCase';
import { CustomerController } from './infra/controller/Customer.controller';
import { ProductController } from './infra/controller/Product.controller';
import { PurchaseController } from './infra/controller/Purchase.controller';
import { CustomerRepository } from './infra/repository/CustomerRepository';
import { ProductRepository } from './infra/repository/ProductRepository';
import { ProductsCustomerRepository } from './infra/repository/ProductsCustomerRepository';

@Module({
  imports: [],
  controllers: [CustomerController, ProductController, PurchaseController],
  providers: [
    PrismaRepository,
    CustomerRepository,
    CustomerQuery,
    ProductRepository,
    ProductQuery,
    PurchaseProductsUseCase,
    ProductsCustomerRepository,
    FilterPurchasesByIdUseCase,
    FilterCustomerPurchasesByDayUseCase,
    FilterCustomerPurchasesByMonthUseCase,
    FilterCustomerPurchasesByYearUseCase,
    ListMostSoldPurchasesByDayUseCase,
    ListMostSoldPurchasesByMonthUseCase,
    ListMostSoldPurchasesByYearUseCase,
    ListCustomersWhoSpentMostByDayUseCase,
  ],
})
export class XptoModule {}
