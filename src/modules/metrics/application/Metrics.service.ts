import { Injectable } from '@nestjs/common';
import { register } from 'prom-client';
import { CounterMetric } from '../domain/CounterMetric';

@Injectable()
export class MetricsService {
  public increment(metric: CounterMetric): void {
    metric.increment(metric.getLabels());
  }

  async getMetrics(): Promise<string> {
    return register.metrics();
  }
}
