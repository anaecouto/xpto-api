import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ProductDTO {
  @ApiProperty({ example: 'Geladeira' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '9000.99' })
  @IsNumber()
  price: number;
}
