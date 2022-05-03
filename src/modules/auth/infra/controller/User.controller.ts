import { Body, Controller, Inject, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/infra/controller/BaseController';
import { UserProvider } from '../../application/provider/UserProvider';
import { CreateUserDTO } from './dto/CreateUserDTO';

@ApiTags('User')
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

  @Post('/:userId/logout')
  @ApiOperation({ summary: 'Desloga do sistema' })
  @ApiParam({ name: 'userId', example: '43e75b48-d2e3-4a8a-9855-a07bcd54fff6' })
  @ApiResponse({ status: 200, description: 'Usuário deslogado com sucesso!' })
  @Public()
  public async logoutUser(
    @Res() res: Response,
    @Param('userId') userId: string,
  ) {
    this.userProvider
      .logoutUser(userId)
      .then((result) => {
        this.ok(res, result);
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
