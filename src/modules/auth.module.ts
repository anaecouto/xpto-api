import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccessTokenProvider } from './xpto/auth/application/provider/AccessTokenProvider';
import { BaseKeycloakProvider } from './xpto/auth/BaseKeycloakProvider';
import { AccessTokenController } from './xpto/auth/infra/controller/AccessToken.controller';

@Module({
  imports: [SharedModule, forwardRef(() => AuthModule)],
  controllers: [AccessTokenController],
  providers: [BaseKeycloakProvider, AccessTokenProvider],
})
export class AuthModule {}
