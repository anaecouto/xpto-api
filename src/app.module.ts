import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { XptoModule } from './modules/xpto/xpto.module';
import { SharedModule } from './shared/shared.module';
import { MetricsModule } from './modules/metrics/metrics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SharedModule,
    XptoModule,
    MetricsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
