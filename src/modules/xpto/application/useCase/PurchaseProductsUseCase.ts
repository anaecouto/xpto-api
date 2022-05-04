import { Inject } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductRepo } from '../../domain/repository/IProductRepo';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { PurchaseDTO } from '../../infra/controller/dtos/PurchaseDTO';
import { ProductRepository } from '../../infra/repository/ProductRepository';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';
import CustomerQuery from '../query/CustomerQuery';
import ProductQuery from '../query/ProductQuery';

export class PurchaseProductsUseCase {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
    @Inject(ProductRepository)
    private productRepository: IProductRepo,
    @Inject(CustomerQuery)
    private customerQuery: CustomerQuery,
    @Inject(ProductQuery)
    private productQuery: ProductQuery,
  ) {}

  async execute(purchaseDTO: PurchaseDTO) {
    const customerFound = await this.customerQuery.findById(
      purchaseDTO.customerId,
    );

    const productFound = await this.productQuery.findById(
      purchaseDTO.productDetails.productId,
    );

    const quantity = purchaseDTO.productDetails.quantity;

    const productsCustomer: ProductsCustomerDomain = {
      productId: productFound._id,
      productName: productFound.name,
      customerId: customerFound._id,
      customerCpf: customerFound.cpf,
      quantity,
      totalValue: quantity * productFound.price,
      created_at: new Date(),
      updated_at: new Date(),
    } as ProductsCustomerDomain;

    if (productFound.quantity <= 0) {
      throw new AppError('Produto está indisponível no momento', {
        status: 400,
      });
    }

    await this.productRepository.purchaseAndUpdateProductQuantity(
      productFound._id,
      quantity,
    );

    await this.productsCustomerRepository.save(productsCustomer);
  }
}
