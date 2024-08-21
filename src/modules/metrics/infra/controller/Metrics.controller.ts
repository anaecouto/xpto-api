import { Controller, Get } from '@nestjs/common';
import { MetricsService } from '../../application/Metrics.service';

@Controller('metrics')
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get()
  async getMetrics(): Promise<string> {
    return this.metricsService.getMetrics();
  }
}