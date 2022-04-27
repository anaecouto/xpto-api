import { Customer, Prisma } from '@prisma/client';
import {
  CustomerDomain,
  CustomerProps,
} from '../../domain/entity/CustomerDomain';

export class CustomerMapper {
  static toDomain(dbCustomer: Customer): CustomerDomain {
    const customerProps = {
      name: dbCustomer.name,
      cpf: dbCustomer.cpf,
      phone: dbCustomer.phone,
      birthDate: dbCustomer.birthDate,
      email: dbCustomer.email,
    } as CustomerProps;

    return CustomerDomain.create(customerProps, dbCustomer.id);
  }

  static toPersistence(customer: CustomerDomain): Prisma.CustomerCreateInput {
    const dbCustomer = {
      id: customer._id,
      name: customer.name,
      cpf: customer.cpf,
      phone: customer.phone,
      birthDate: customer.birthDate,
      email: customer.email,
    } as Prisma.CustomerCreateInput;

    return dbCustomer;
  }
}
