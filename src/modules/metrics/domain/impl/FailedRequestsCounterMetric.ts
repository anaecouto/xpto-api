import { Counter, register } from 'prom-client';
import { CounterMetric } from '../CounterMetric';

export class FailedRequestsCounterMetric implements CounterMetric {
  private readonly counter: Counter<string>;
  private readonly COUNTER_NAME: string = 'xpto_api_failed_requests_total';

  constructor(private readonly labels: Record<string, string>) {
    if (!register.getSingleMetric(this.COUNTER_NAME)) {
      this.counter = new Counter({
        name: this.COUNTER_NAME,
        help: 'Total number of failed HTTP requests',
        labelNames: ['method', 'status_code', 'method_name'],
      });
      register.registerMetric(this.counter);
    } else {
      this.counter = register.getSingleMetric(this.COUNTER_NAME) as Counter<string>;
    }
  }

  increment(): void {
    this.counter.inc(this.labels);
  }
}