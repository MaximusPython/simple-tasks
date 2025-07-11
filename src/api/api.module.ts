import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ApiController],
  providers: [ApiService, PrismaService, ConfigService],
  exports: [ApiService],
})
export class ApiModule {}
