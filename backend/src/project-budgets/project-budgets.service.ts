import { Injectable } from '@nestjs/common';
import { CreateProjectBudgetDto } from './dto/create-project-budget.dto';
import { UpdateProjectBudgetDto } from './dto/update-project-budget.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProjectBudgetsService {
  constructor(private prisma: PrismaService) { }

  create(createProjectBudgetDto: CreateProjectBudgetDto) {
    return this.prisma.projectBudget.create({
      data: {
        category: createProjectBudgetDto.category,
        amount: Number(createProjectBudgetDto.amount),
        description: createProjectBudgetDto.description,
        projectId: Number(createProjectBudgetDto.projectId),
      },
    });
  }

  findAll(projectId?: number) {
    if (projectId) {
      return this.prisma.projectBudget.findMany({
        where: { projectId: Number(projectId) },
      });
    }
    return this.prisma.projectBudget.findMany();
  }

  findOne(id: number) {
    return this.prisma.projectBudget.findUnique({ where: { id } });
  }

  update(id: number, updateProjectBudgetDto: UpdateProjectBudgetDto) {
    return this.prisma.projectBudget.update({
      where: { id },
      data: {
        category: updateProjectBudgetDto.category,
        amount: updateProjectBudgetDto.amount ? Number(updateProjectBudgetDto.amount) : undefined,
        description: updateProjectBudgetDto.description,
      },
    });
  }

  remove(id: number) {
    return this.prisma.projectBudget.delete({ where: { id } });
  }
}
