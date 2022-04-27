import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

class ProductDetailsDTO {
  @ApiProperty({ example: 'd4c90ffa-d4c9-4c5a-8b3a-e4f6f355112b' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  quantity: number;
}

export class PurchaseDTO {
  @ApiProperty({ example: '89e22db8-f5da-4694-a5cd-e7c5cc668d70' })
  @IsString()
  customerId: string;

  @ApiProperty({ description: 'Detalhes do Produto' })
  @ValidateNested()
  @Type(() => ProductDetailsDTO)
  productDetails: ProductDetailsDTO;
}
