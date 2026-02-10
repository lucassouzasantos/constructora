export class CreateWorkLogDto {
    workerId: number;
    projectId: number;
    date: string;
    hours: number;
    description?: string;
}

export class UpdateWorkLogDto {
    hours?: number;
    description?: string;
    date?: string;
}
