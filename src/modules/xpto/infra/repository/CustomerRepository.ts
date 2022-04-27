import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/shared/core/BaseRepository';
import { PrismaRepository } from 'src/shared/infra/database/prisma/PrismaRepository';
import { CustomerMapper } from '../../application/mappers/CustomerMapper';
import { CustomerDomain } from '../../domain/entity/CustomerDomain';
import { ICustomerRepo } from '../../domain/repository/ICustomerRepo';

@Injectable()
export class CustomerRepository
  extends BaseRepository
  implements ICustomerRepo
{
  constructor(private prismaRepository: PrismaRepository) {
    super(prismaRepository, 'customers');
  }

  async save(customer: CustomerDomain): Promise<CustomerDomain> {
    const toPersistence = CustomerMapper.toPersistence(customer);
    const savedCustomer = await this.prismaRepository.customer.create({
      data: toPersistence,
    });
    return CustomerMapper.toDomain(savedCustomer);
  }

  async findByCpf(cpf: string): Promise<CustomerDomain> {
    const customerEntity = await this.prismaRepository.customer.findUnique({
      where: {
        cpf,
      },
    });

    return CustomerMapper.toDomain(customerEntity);
  }

  async findById(id: string): Promise<CustomerDomain> {
    const customerEntity = await this.prismaRepository.customer.findUnique({
      where: {
        id,
      },
    });

    return CustomerMapper.toDomain(customerEntity);
  }

  async update(
    id: string,
    updateParams: CustomerDomain,
  ): Promise<CustomerDomain> {
    const customerDomain = CustomerMapper.toPersistence(updateParams);
    const updatedCustomer = await this.prismaRepository.customer.update({
      where: { id },
      data: customerDomain,
    });

    return CustomerMapper.toDomain(updatedCustomer);
  }

  async delete(id: string) {
    await this.prismaRepository.customer.delete({
      where: { id },
    });
  }
}
