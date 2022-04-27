import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CustomerDTO {
  @ApiProperty({ example: 'Isadora Sophia Barbosa' })
  @IsString()
  name: string;

  @ApiProperty({ example: '46697279907' })
  @IsString()
  cpf: string;

  @ApiProperty({ example: '81992801636' })
  @IsNumberString()
  phone: string;

  @ApiProperty({ example: '1989-06-05' })
  @IsDateString()
  birthDate: string;

  @ApiProperty({ example: 'isadora.sophiaaaaa@gmail.com' })
  @IsEmail()
  email: string;
}
