import { Module } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';

@Module({
  imports: [],
  controllers: [BillingController],
  providers: [BillingService, PrismaService],
})
export class BillingModule {}
