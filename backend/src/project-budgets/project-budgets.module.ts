import { Module } from '@nestjs/common';
import { ProjectBudgetsService } from './project-budgets.service';
import { ProjectBudgetsController } from './project-budgets.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProjectBudgetsController],
  providers: [ProjectBudgetsService, PrismaService],
})
export class ProjectBudgetsModule { }
