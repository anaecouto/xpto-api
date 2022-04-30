import { forwardRef, Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { AccessTokenProvider } from './application/provider/AccessTokenProvider';
import { UserProvider } from './application/provider/UserProvider';
import { BaseKeycloakProvider } from './BaseKeycloakProvider';
import { AccessTokenController } from './infra/controller/AccessToken.controller';
import { UserController } from './infra/controller/User.controller';

@Module({
  imports: [SharedModule, forwardRef(() => AuthModule)],
  controllers: [AccessTokenController, UserController],
  providers: [BaseKeycloakProvider, AccessTokenProvider, UserProvider],
})
export class AuthModule {}
