export interface CounterMetric {
  increment(labels: Record<string, string>): void;
  getLabels(): Record<string, string>;
}
