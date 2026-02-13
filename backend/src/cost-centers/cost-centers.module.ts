import { Module } from '@nestjs/common';
import { CostCentersService } from './cost-centers.service';
import { CostCentersController } from './cost-centers.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CostCentersController],
  providers: [CostCentersService, PrismaService],
})
export class CostCentersModule { }
