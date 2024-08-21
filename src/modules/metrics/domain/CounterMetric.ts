export interface CounterMetric {
  increment(metric: CounterMetric): void;
}
