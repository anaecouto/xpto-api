import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ example: 'anacouto' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'anaecouto92@gmail.com' })
  @IsString()
  email: string;

  @ApiProperty({ example: 'Ana Elisa' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Rodrigues do Couto' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;
}
