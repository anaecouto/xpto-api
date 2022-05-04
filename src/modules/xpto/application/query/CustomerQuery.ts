import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
import AppError from 'src/shared/core/errors/AppError';
import { CustomerDomain } from '../../domain/entity/CustomerDomain';
import { ICustomerRepo } from '../../domain/repository/ICustomerRepo';
import { CustomerDTO } from '../../infra/controller/dtos/CustomerDTO';
import { CustomerRepository } from '../../infra/repository/CustomerRepository';
import { CustomerMapper } from '../mappers/CustomerMapper';

@Injectable()
export default class CustomerQuery {
  constructor(
    @Inject(CustomerRepository)
    private customerRepository: ICustomerRepo,
  ) {}

  async createCustomer(
    createCustomerDTO: CustomerDTO,
  ): Promise<CustomerDomain> {
    try {
      const customerDomain = CustomerMapper.toDomain(
        createCustomerDTO as Customer,
      );
      return await this.customerRepository.save(customerDomain);
    } catch (e) {
      throw new AppError('Cliente já está cadastrado', { status: 400 });
    }
  }

  async findById(id: string): Promise<CustomerDomain> {
    try {
      return await this.customerRepository.findById(id);
    } catch (e) {
      throw new AppError('Cliente não encontrado', { status: 404 });
    }
  }

  async findCustomer(cpf: string): Promise<CustomerDomain> {
    try {
      return await this.customerRepository.findByCpf(cpf);
    } catch (e) {
      throw new AppError('Cliente não encontrado', { status: 404 });
    }
  }

  async updateCustomer(
    id: string,
    updateParams: CustomerDTO,
  ): Promise<CustomerDomain> {
    try {
      return await this.customerRepository.update(
        id,
        updateParams as CustomerDomain,
      );
    } catch (e) {
      throw new AppError('Cliente não encontrado', { status: 404 });
    }
  }

  async deleteCustomer(id: string) {
    try {
      await this.customerRepository.delete(id);
    } catch (e) {
      throw new AppError('Cliente não encontrado', { status: 404 });
    }
  }
}
