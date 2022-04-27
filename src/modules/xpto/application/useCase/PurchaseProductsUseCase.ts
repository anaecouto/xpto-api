import { Inject } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { ICustomerRepo } from '../../domain/repository/ICustomerRepo';
import { IProductRepo } from '../../domain/repository/IProductRepo';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { PurchaseDTO } from '../../infra/controller/dtos/PurchaseDTO';
import { CustomerRepository } from '../../infra/repository/CustomerRepository';
import { ProductRepository } from '../../infra/repository/ProductRepository';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';

export class PurchaseProductsUseCase {
  constructor(
    @Inject(CustomerRepository) private customerRepository: ICustomerRepo,
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
    @Inject(ProductRepository)
    private productRepository: IProductRepo,
  ) {}

  async execute(purchaseDTO: PurchaseDTO) {
    const customerFound = await this.customerRepository.findById(
      purchaseDTO.customerId,
    );

    if (!customerFound) {
      throw new AppError('Cliente inexistente!');
    }

    const productFound = await this.productRepository.findById(
      purchaseDTO.productDetails.productId,
    );

    if (!productFound) {
      throw new AppError('Produto inexistente!');
    }

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
      throw new AppError('Produto está indisponível no momento');
    }

    await this.productRepository.purchaseAndUpdateProductQuantity(
      productFound._id,
      quantity,
    );

    await this.productsCustomerRepository.save(productsCustomer);
  }
}
