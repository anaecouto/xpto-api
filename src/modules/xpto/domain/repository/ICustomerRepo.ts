// import { Customer } from '@prisma/client';
import { CustomerDomain } from '../entity/CustomerDomain';
export interface ICustomerRepo {
  paginate({ options: IPaginationOptions, where: any }): Promise<any>;
  save(customer: CustomerDomain): Promise<CustomerDomain>;
  findById(id: string): Promise<CustomerDomain>;
  findByCpf(cpf: string): Promise<CustomerDomain>;
  update(id: string, updateParams: CustomerDomain): Promise<CustomerDomain>;
  delete(id: string);
}
