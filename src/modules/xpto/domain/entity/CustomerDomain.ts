import { Entity } from 'src/shared/domain/Entity';

export interface CustomerProps {
  name: string;
  cpf: string;
  phone: string;
  birthDate: string;
  email: string;
}

export class CustomerDomain extends Entity<CustomerProps> {
  private constructor(props: CustomerProps, id?: string) {
    super(props, id);
  }

  static create(props: CustomerProps, id?: string) {
    const customer = new CustomerDomain(props, id);
    return customer;
  }

  get name(): string {
    return this.props.name;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get phone(): string {
    return this.props.phone;
  }

  get birthDate(): string {
    return this.props.birthDate;
  }

  get email(): string {
    return this.props.email;
  }
}
