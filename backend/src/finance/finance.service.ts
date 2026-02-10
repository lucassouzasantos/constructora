import { Injectable } from '@nestjs/common';
import { CreateFinanceDto } from './dto/create-finance.dto';
import { UpdateFinanceDto } from './dto/update-finance.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) { }

  create(createFinanceDto: CreateFinanceDto) {
    const { dueDate, supplierId, customerId, projectId, category, quantity, unit, ...rest } = createFinanceDto;
    return this.prisma.financialTransaction.create({
      data: {
        ...rest,
        category,
        quantity,
        unit,
        dueDate: new Date(dueDate),
        ...(supplierId && { supplier: { connect: { id: Number(supplierId) } } }),
        ...(customerId && { customer: { connect: { id: Number(customerId) } } }),
        ...(projectId && { project: { connect: { id: Number(projectId) } } }),
      },
      include: {
        supplier: true,
        customer: true,
        project: true,
      },
    });
  }

  findAll(projectId?: number) {
    return this.prisma.financialTransaction.findMany({
      where: projectId ? { projectId } : undefined,
      orderBy: { dueDate: 'desc' },
      include: {
        supplier: true,
        customer: true,
        project: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.financialTransaction.findUnique({
      where: { id },
      include: {
        supplier: true,
        customer: true,
        project: true,
      },
    });
  }

  update(id: number, updateFinanceDto: UpdateFinanceDto) {
    const { dueDate, supplierId, customerId, projectId, category, quantity, unit, ...rest } = updateFinanceDto;

    const data: any = {
      ...rest,
      category,
      quantity,
      unit,
    };

    if (dueDate) {
      data.dueDate = new Date(dueDate);
    }

    // Handle Relations via Scalar Fields
    if (supplierId !== undefined) {
      data.supplierId = supplierId ? Number(supplierId) : null;
    }

    if (customerId !== undefined) {
      data.customerId = customerId ? Number(customerId) : null;
    }

    if (projectId !== undefined) {
      data.projectId = projectId ? Number(projectId) : null;
    }

    return this.prisma.financialTransaction.update({
      where: { id },
      data,
      include: {
        supplier: true,
        customer: true,
        project: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.financialTransaction.delete({
      where: { id },
    });
  }
}
