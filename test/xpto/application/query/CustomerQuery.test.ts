import { Test } from '@nestjs/testing';
import CustomerQuery from 'src/modules/xpto/application/query/CustomerQuery';
import { CustomerDomain } from 'src/modules/xpto/domain/entity/CustomerDomain';
import { CustomerDTO } from 'src/modules/xpto/infra/controller/dtos/CustomerDTO';
import { CustomerRepository } from 'src/modules/xpto/infra/repository/CustomerRepository';

describe('customer query', () => {
  let customerQuery: CustomerQuery;
  let customerRepository;

  const customerCreatedMock: CustomerDomain = {
    _id: '62712b652ff48bdb383a362b',
    props: {
      name: 'Ana Elisa',
      cpf: '111111111111',
      phone: '61999999999',
      birthDate: '2004-05-23',
      email: 'anaer929292couto@gmail.com',
    },
  } as CustomerDomain;

  const customerFoundMock = {
    customer: {
      name: 'Roberto Pedro Henrique',
      cpf: '38854441945',
      phone: '62996442458',
      birthDate: '1990-03-20',
      email: 'roberto_almada@luxafit.com.br',
    },
  };

  const updatedCustomerMock = {
    customer: {
      name: 'Ana Elisa',
      cpf: '11111111111',
      phone: '61999987458',
      birthDate: '1996-08-04',
      email: 'anaaaaaaaaaaaaa@gmail.com',
    },
  };

  const customerDeleted = {
    message: 'Cliente deletado com sucesso!',
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CustomerQuery,
        {
          provide: CustomerRepository,
          useValue: {
            save: jest.fn().mockResolvedValue(customerCreatedMock),
            findByCpf: jest.fn().mockResolvedValue(customerFoundMock),
            findById: jest.fn().mockResolvedValue(customerFoundMock),
            update: jest.fn().mockResolvedValue(updatedCustomerMock),
            delete: jest.fn().mockResolvedValue(customerDeleted),
          },
        },
      ],
    }).compile();

    customerQuery = await module.resolve<CustomerQuery>(CustomerQuery);

    module.get<CustomerRepository>(CustomerRepository);
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

    expect(result).toEqual(customerCreatedMock);
  });

  it('should find customer by cpf', async () => {
    const result = await customerQuery.findCustomer('38854441945');

    expect(result).toEqual(customerFoundMock);
  });

  it('should find customer by id', async () => {
    const result = await customerQuery.findById(
      'c2e2724c-8825-421b-aed6-d570d87bcb93',
    );

    expect(result).toEqual(customerFoundMock);
  });

  it('should update customer', async () => {
    const updateCustomer: CustomerDTO = {
      name: 'Ana Elisa',
      cpf: '11111111111',
      phone: '61999987458',
      birthDate: '1996-08-04',
      email: 'anaaaaaaaaaaaaa@gmail.com',
    };
    const result = await customerQuery.updateCustomer(
      '62712b652ff48bdb383a362b',
      updateCustomer,
    );

    expect(result).toEqual(updatedCustomerMock);
  });

  it('should delete customer', async () => {
    const result = await customerQuery.deleteCustomer(
      '62712b652ff48bdb383a362b',
    );

    expect(result).toEqual(customerDeleted);
  });
});
