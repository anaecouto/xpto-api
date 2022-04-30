/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import AppError from 'src/shared/core/errors/AppError';
import KeycloakError from 'src/shared/core/errors/KeycloakError';
import { IAccountCreatedEvent } from 'src/shared/core/interfaces/accountCreatedEvent.interface';
import { IBaseKeycloakPayload } from '../../interfaces/BaseKeycloakPayload.interface';
import { RealmMaster } from '../../RealmMaster.decorator';

interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
}

export interface IKeycloakUser {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName?: string;
  enabled?: boolean;
  attributes?: {};
  groups?: [];
  emailVerified?: boolean;
  requiredActions?: string[];
  clientRoles?: {};
  realmRoles?: string[];
}

export interface ISetupNewPassword extends IBaseKeycloakPayload {
  newPassword: string;
}

@Injectable()
export class UserProvider {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
  }

  @RealmMaster()
  public async create(payload: IAccountCreatedEvent): Promise<any> {
    const realmTarget = process.env.KEYCLOAK_REALM;

    const body = {
      username: payload.username,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      credentials: [
        {
          type: 'password',
          value: payload.password,
          temporary: false,
        },
      ],
      groups: ['adminGroup'],
      enabled: true,
      emailVerified: true,
    };

    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users`,
      method: 'POST',
      data: body,
      timeout: 120000,
    } as AxiosRequestConfig;

    return this.axios
      .request(requestConfig)
      .then((result) => {
        const userId = this.getKeycloakUserId(result);
        payload['id'] = userId;

        return { message: 'Usuário criado com sucesso!' };
      })
      .catch((error) => {
        throw new KeycloakError(error.message, {
          status: error.response ? error.response.status : 403,
          keycloak_error: error?.response?.data.error_description || '',
        });
      });
  }

  // @RealmMaster()
  // public async sendEmailVerification(
  //   payload: IBaseKeycloakPayload,
  // ): Promise<TokenResponse> {
  //   const realmTarget = payload?.realm || process.env.KEYCLOAK_REALM;
  //   const requestConfig = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users/${payload.userId}/send-verify-email`,
  //     method: 'PUT',
  //   } as AxiosRequestConfig;

  //   return this.axios
  //     .request(requestConfig)
  //     .then((result) => {
  //       console.log('User: ' + result);
  //       return result.data;
  //     })
  //     .catch((error) => {
  //       throw new AppError(error.message, {
  //         status: error.response ? error.response.status : 403,
  //         keycloak_error: error?.response?.data.error_description || '',
  //       });
  //     });
  // }

  // @RealmMaster()
  // public async logoutUser(
  //   payload: IBaseKeycloakPayload,
  // ): Promise<TokenResponse> {
  //   const realmTarget = payload?.realm || process.env.KEYCLOAK_REALM;
  //   const requestConfig = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users/${payload.userId}/logout`,
  //     method: 'POST',
  //   } as AxiosRequestConfig;

  //   return this.axios
  //     .request(requestConfig)
  //     .then((result) => {
  //       return result.data;
  //     })
  //     .catch((error) => {
  //       throw new AppError(error.message, {
  //         status: error.response ? error.response.status : 403,
  //         keycloak_error: error?.response?.data.error_description || '',
  //       });
  //     });
  // }

  // @RealmMaster()
  // public async setUpNewPassword(
  //   payload: ISetupNewPassword,
  // ): Promise<TokenResponse> {
  //   const realmTarget = payload?.realm || process.env.KEYCLOAK_REALM;
  //   const requestConfig = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     url: `${process.env.KEYCLOAK_URL}/admin/realms/${realmTarget}/users/${payload.userId}/reset-password`,
  //     method: 'PUT',
  //     data: {
  //       type: 'password',
  //       value: payload.newPassword,
  //       temporary: false,
  //     },
  //   } as AxiosRequestConfig;

  //   return this.axios
  //     .request(requestConfig)
  //     .then((result) => {
  //       console.log('User: ' + result);
  //       return result.data;
  //     })
  //     .catch((error) => {
  //       throw new AppError(error.message, {
  //         status: error.response ? error.response.status : 403,
  //         keycloak_error: error?.response?.data.error_description || '',
  //       });
  //     });
  // }

  private getKeycloakUserId(keycloakResult: any): string {
    const keycloakHeaders = keycloakResult?.headers['location'];
    return keycloakHeaders ? keycloakHeaders.split('/').pop() : '';
  }
}
