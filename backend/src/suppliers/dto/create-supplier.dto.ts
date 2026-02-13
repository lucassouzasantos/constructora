import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateSupplierDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    ruc?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    category?: string;
}
