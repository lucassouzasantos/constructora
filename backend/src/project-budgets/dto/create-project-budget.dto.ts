export class CreateProjectBudgetDto {
    category: string;
    amount: number | string;
    description?: string;
    projectId: number | string;
}
