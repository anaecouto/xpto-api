import { Body, Controller, Inject, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/infra/controller/BaseController';
import { UserProvider } from '../../application/provider/UserProvider';
import { CreateUserDTO } from './dto/CreateUserDTO';

@ApiTags('user')
@Controller('user')
export class UserController extends BaseController {
  constructor(@Inject(UserProvider) private userProvider: UserProvider) {
    super();
  }

  @Post('create')
  @ApiOperation({ summary: 'Cria novo usuário no realm xpto-api' })
  @ApiResponse({ status: 201, description: 'Usuário criado!' })
  @Public()
  public async createUser(@Res() res: Response, @Body() dto: CreateUserDTO) {
    this.userProvider
      .create(dto)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
