import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class BaseKeycloakProvider {
  public axios: AxiosInstance;
  public baseUrl = process.env.KEYCLOAK_URL;

  constructor() {
    this.axios = axios.create();
  }
}
