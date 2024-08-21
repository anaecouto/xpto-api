import { Inject, Injectable } from '@nestjs/common';
import AppError from 'src/shared/core/errors/AppError';
import { ProductsCustomerDomain } from '../../domain/entity/ProductsCustomerDomain';
import { IProductsCustomerRepo } from '../../domain/repository/IProductsCustomerRepo';
import { ProductsCustomerRepository } from '../../infra/repository/ProductsCustomerRepository';
import { MetricsService } from 'src/modules/metrics/application/Metrics.service';
import { FailedRequestsCounterMetric } from 'src/modules/metrics/domain/impl/FailedRequestsCounterMetric';

@Injectable()
export default class ProductsCustomerQuery {
  constructor(
    @Inject(ProductsCustomerRepository)
    private productsCustomerRepository: IProductsCustomerRepo,
    @Inject(MetricsService)
    private metricsService: MetricsService,
  ) {}

  async findById(id: string): Promise<ProductsCustomerDomain> {
    try {
      return await this.productsCustomerRepository.findById(id);
    } catch (e) {
      const failedRequests = new FailedRequestsCounterMetric({
        method: 'GET',
        status_code: '404',
        method_name: '[ProductsCustomerQuery][findById]',
      });
      this.metricsService.increment(failedRequests);
      throw new AppError('Essa compra não existe', { status: 404 });
    }
  }

  async listAllPurchases(): Promise<ProductsCustomerDomain[]> {
    return await this.productsCustomerRepository.listAllPurchases();
  }

  async deletePurchase(id: string) {
    try {
      await this.productsCustomerRepository.delete(id);
    } catch (e) {
      throw new AppError('Essa compra não existe', { status: 404 });
    }
  }
}
