import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccessTokenProvider } from './auth/application/provider/AccessTokenProvider';
import { BaseKeycloakProvider } from './auth/BaseKeycloakProvider';
import { AccessTokenController } from './auth/infra/controller/AccessToken.controller';

@Module({
  imports: [SharedModule, forwardRef(() => AuthModule)],
  controllers: [AccessTokenController],
  providers: [BaseKeycloakProvider, AccessTokenProvider],
})
export class AuthModule {}
