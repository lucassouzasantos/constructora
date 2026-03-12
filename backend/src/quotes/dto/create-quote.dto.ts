import { IsString, IsOptional, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuoteItemDto {
    @IsString()
    description: string;

    @IsString()
    unit: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    unitCost: number;
}

export class CreateQuoteStageDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuoteItemDto)
    items: CreateQuoteItemDto[];
}

export class CreateQuoteIndirectCostDto {
    @IsString()
    description: string;

    @IsNumber()
    amount: number;
}

export class CreateQuoteDto {
    @IsString()
    title: string;

    @IsOptional()
    @IsNumber()
    customerId?: number;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsString()
    type: string;

    @IsOptional()
    @IsNumber()
    totalArea?: number;

    @IsOptional()
    @IsString()
    responsible?: string;

    @IsOptional()
    @IsString()
    paymentTerms?: string;

    @IsOptional()
    @IsString()
    estimatedTime?: string;

    @IsOptional()
    @IsString()
    includedItems?: string;

    @IsOptional()
    @IsString()
    excludedItems?: string;

    @IsOptional()
    @IsNumber()
    validityDays?: number;

    @IsOptional()
    @IsNumber()
    marginPercentage?: number;

    @IsOptional()
    @IsString()
    status?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuoteStageDto)
    stages: CreateQuoteStageDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateQuoteIndirectCostDto)
    indirectCosts: CreateQuoteIndirectCostDto[];
}
