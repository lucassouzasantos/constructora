import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCostCenterDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    code?: string;

    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
