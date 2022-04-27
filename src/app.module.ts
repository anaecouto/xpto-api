import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { XptoModule } from './modules/xpto/xpto.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SharedModule,
    XptoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
