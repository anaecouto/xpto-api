import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from 'nest-keycloak-connect';
import { BaseController } from 'src/shared/infra/controller/BaseController';
import { AccessTokenProvider } from '../../application/provider/AccessTokenProvider';
import { IGetTokenKeycloakDTO } from '../dtos/GetTokenKeycloakDTO';

@ApiTags('auth')
@Controller('auth')
export class AccessTokenController extends BaseController {
  constructor(private accessTokenProvider: AccessTokenProvider) {
    super();
  }

  @Post('token')
  @ApiOperation({ summary: 'Gera token de acesso' })
  @ApiResponse({ status: 200 })
  @Public()
  async newMessage(@Res() res: Response, @Body() dto: IGetTokenKeycloakDTO) {
    this.accessTokenProvider
      .token(dto)
      .then((result) => {
        this.ok(res, {
          access_token: result.access_token,
          expires_in: result.expires_in,
        });
      })
      .catch((err) => {
        this.handleAppError(res, err);
      });
  }
}
