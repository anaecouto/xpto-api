import { Entity } from 'src/shared/domain/Entity';

export interface ProductsCustomerProps {
  productId: string;
  productName: string;
  customerId: string;
  customerCpf: string;
  quantity: number;
  totalValue: number;
  created_at?: Date;
  updated_at?: Date;
}

export class ProductsCustomerDomain extends Entity<ProductsCustomerProps> {
  private constructor(props: ProductsCustomerProps, id?: string) {
    super(props, id);
  }

  static create(props: ProductsCustomerProps, id?: string) {
    const productsCustomer = new ProductsCustomerDomain(props, id);
    return productsCustomer;
  }

  get productId(): string {
    return this.props.productId;
  }

  set productId(productId: string) {
    this.props.productId = productId;
  }

  get productName(): string {
    return this.props.productName;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get totalValue(): number {
    return this.props.totalValue;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  set customerId(customerId: string) {
    this.props.customerId = customerId;
  }

  get customerCpf(): string {
    return this.props.customerCpf;
  }

  set customerCpf(customerCpf: string) {
    this.props.customerCpf = customerCpf;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  get updated_at(): Date {
    return this.props.updated_at;
  }

  set updated_at(updated_at: Date) {
    this.props.updated_at = updated_at;
  }
}
