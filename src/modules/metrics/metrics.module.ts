import { Module } from '@nestjs/common';
import { PrometheusModule } from 'nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register()],
  providers: [],
  exports: [PrometheusModule],
})
export class MetricsModule {}
