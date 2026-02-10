CREATE TABLE IF NOT EXISTS "FinancialTransaction" (
    "id" SERIAL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(10, 2) NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);
