import { Inject, Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';
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
    const customerDomain = CustomerMapper.toDomain(
      createCustomerDTO as Customer,
    );
    return await this.customerRepository.save(customerDomain);
  }

  async findById(id: string): Promise<CustomerDomain> {
    return await this.customerRepository.findById(id);
  }

  async findCustomer(cpf: string): Promise<CustomerDomain> {
    return await this.customerRepository.findByCpf(cpf);
  }

  async updateCustomer(
    id: string,
    updateParams: CustomerDTO,
  ): Promise<CustomerDomain> {
    return await this.customerRepository.update(
      id,
      updateParams as CustomerDomain,
    );
  }

  async deleteCustomer(id: string) {
    return await this.customerRepository.delete(id);
  }
}
