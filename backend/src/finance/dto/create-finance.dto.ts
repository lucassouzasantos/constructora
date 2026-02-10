export class CreateFinanceDto {
    description: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
    status: 'PENDING' | 'PAID';
    dueDate: string;
    supplierId?: number;
    customerId?: number;
    projectId?: number;

    category?: string;
    quantity?: number;
    unit?: string;
}
