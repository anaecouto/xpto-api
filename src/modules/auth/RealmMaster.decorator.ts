import axios, { AxiosRequestConfig } from 'axios';
import { stringify } from 'querystring';
import AppError from 'src/shared/core/errors/AppError';

export function RealmMaster() {
  return (target: any, propertyKey: any, descriptor: any) => {
    const originalMethod = descriptor.value;
    const newDescriptor = { ...descriptor };

    newDescriptor.value = async function (...args: any[]) {
      const body = {
        grant_type: 'password',
        client_id: process.env.KEYCLOAK_MASTER_CLIENT_ID,
        username: process.env.KEYCLOAK_ADMIN_USERNAME,
        password: process.env.KEYCLOAK_ADMIN_PASSWORD
      };

      const requestConfig = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: `${process.env.KEYCLOAK_URL}/realms/master/protocol/openid-connect/token`,
        method: 'POST',
        data: stringify(body),
      } as AxiosRequestConfig;

      await axios
        .request(requestConfig)
        .then((result) => {
          this.axios.defaults.headers.common.Authorization = `Bearer ${result.data.access_token}`;
        })
        .catch((res) => {
          return Promise.reject(
            new AppError(
              'Não foi possível obter o token master. Verifique suas credenciais',
              {
                status: res.response ? res.response.status : 403,
                keycloak_error: res?.response?.data.error_description || '',
              },
            ),
          );
        });
      return originalMethod.apply(this, args);
    };

    return newDescriptor;
  };
}
