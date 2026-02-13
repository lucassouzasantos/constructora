import { IsString, IsNumber, IsEnum, IsOptional, IsDateString } from 'class-validator';

export class CreateFinanceDto {
    @IsString()
    description: string;

    @IsNumber()
    amount: number;

    @IsEnum(['INCOME', 'EXPENSE'])
    type: 'INCOME' | 'EXPENSE';

    @IsEnum(['PENDING', 'PAID'])
    status: 'PENDING' | 'PAID';

    @IsDateString()
    dueDate: string;

    @IsOptional()
    @IsNumber()
    supplierId?: number;

    @IsOptional()
    @IsNumber()
    customerId?: number;

    @IsOptional()
    @IsNumber()
    projectId?: number;

    @IsOptional()
    @IsNumber()
    costCenterId?: number;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsNumber()
    quantity?: number;

    @IsOptional()
    @IsString()
    unit?: string;
}
