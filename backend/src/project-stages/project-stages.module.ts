import { Module } from '@nestjs/common';
import { ProjectStagesService } from './project-stages.service';
import { ProjectStagesController } from './project-stages.controller';

import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ProjectStagesController],
  providers: [ProjectStagesService, PrismaService],
})
export class ProjectStagesModule { }
