import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable() // c:\Users\lucassouza\.gemini\antigravity\playground\fusion-ring\backend\src\users\users.service.ts
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async findOne(email: string) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
}
