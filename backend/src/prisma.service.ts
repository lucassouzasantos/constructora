import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
        await this.seedMasterAdmin();
    }

    private async seedMasterAdmin() {
        const adminEmail = 'admin@admin.com';
        const existingAdmin = await this.user.findUnique({
            where: { email: adminEmail }
        });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin', 10);
            await this.user.create({
                data: {
                    email: adminEmail,
                    password: hashedPassword,
                    name: 'Admin',
                    role: 'ADMIN'
                }
            });
            console.log('Master ADMIN user seeded successfully.');
        } else if (existingAdmin.role !== 'ADMIN') {
            await this.user.update({
                where: { email: adminEmail },
                data: { role: 'ADMIN' }
            });
            console.log('Master ADMIN role restored.');
        }
    }
}
