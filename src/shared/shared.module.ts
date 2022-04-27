import { Module } from '@nestjs/common';
import { BaseRepository } from './core/BaseRepository';
import { PrismaRepository } from './infra/database/prisma/PrismaRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [BaseRepository, PrismaRepository],
})
export class SharedModule {}
