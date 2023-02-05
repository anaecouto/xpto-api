import { Injectable } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';
import AppError from 'src/shared/core/errors/AppError';
import { BaseKeycloakProvider } from '../../BaseKeycloakProvider';
import { IGetTokenKeycloakDTO } from '../../infra/dtos/GetTokenKeycloakDTO';

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
}

@Injectable()
export class AccessTokenProvider extends BaseKeycloakProvider {
  constructor() {
    super();
  }

  public async token(payload: IGetTokenKeycloakDTO): Promise<TokenResponse> {
    const realmTarget = process.env.KEYCLOAK_REALM;
    const body = {
      ...payload,
      grant_type: 'password',
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET
    };

    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      url: `${this.baseUrl}/realms/${realmTarget}/protocol/openid-connect/token`,
      method: 'POST',
      data: stringify(body),
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw new AppError(error.message, {
          status: error.response ? error.response.status : 403,
          keycloak_error: error?.response?.data.error_description || '',
        });
      });
  }
}
