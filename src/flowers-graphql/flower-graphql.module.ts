import { Module } from '@nestjs/common';
import { ApiGraphqlResolver } from './flower-graphql.resolver';
import { ApiService } from 'src/api/api.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ApiGraphqlResolver, ApiService, PrismaService],
})
export class ApiGraphqlModule {}
