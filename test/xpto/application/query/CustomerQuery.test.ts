import { Test } from '@nestjs/testing';
import CustomerQuery from 'src/modules/xpto/application/query/CustomerQuery';
import { CustomerDomain } from 'src/modules/xpto/domain/entity/CustomerDomain';
import { CustomerDTO } from 'src/modules/xpto/infra/controller/dtos/CustomerDTO';
import { CustomerRepository } from 'src/modules/xpto/infra/repository/CustomerRepository';

const customerDomainMock: CustomerDomain = {
  _id: '62712b652ff48bdb383a362b',
  props: {
    name: 'Ana Elisa',
    cpf: '111111111111',
    phone: '61999999999',
    birthDate: '2004-05-23',
    email: 'anaer929292couto@gmail.com',
  },
} as CustomerDomain;

describe('customer query', () => {
  let customerQuery: CustomerQuery;
  let customerRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerQuery,
        {
          provide: CustomerRepository,
          useValue: {
            save: jest.fn().mockResolvedValue(customerDomainMock),
          },
        },
      ],
    }).compile();

    customerQuery = await module.resolve<CustomerQuery>(CustomerQuery);

    customerRepository = await module.get<CustomerRepository>(
      CustomerRepository,
    );
  });

  it('should create a new customer', async () => {
    const dto: CustomerDTO = {
      name: 'Ana Elisa',
      cpf: '111111111111',
      phone: '61999999999',
      birthDate: '2004-05-23',
      email: 'anaer929292couto@gmail.com',
    };

    const result = await customerQuery.createCustomer(dto);

    expect(result).toEqual(customerDomainMock);
  });
});
