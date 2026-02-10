export class CreateWorkerDto {
    name: string;
    role?: string;
    hourlyRate: number;
    phone?: string;
}

export class UpdateWorkerDto {
    name?: string;
    role?: string;
    hourlyRate?: number;
    phone?: string;
    active?: boolean;
}
