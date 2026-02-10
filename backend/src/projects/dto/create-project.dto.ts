export class CreateProjectDto {
    name: string;
    city?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    customerId?: number;
}
