export class CreateProjectStageDto {
    name: string;
    projectId: number;
    startDatePlanned?: string;
    endDatePlanned?: string;
    startDateReal?: string;
    endDateReal?: string;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}
