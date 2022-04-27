import { Entity } from 'src/shared/domain/Entity';

export interface ProductProps {
  name: string;
  quantity: number;
  price: number;
  customerId: string;
}

export class ProductDomain extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  static create(props: ProductProps, id?: string) {
    const product = new ProductDomain(props, id);
    return product;
  }

  get name(): string {
    return this.props.name;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get price(): number {
    return this.props.price;
  }
}
