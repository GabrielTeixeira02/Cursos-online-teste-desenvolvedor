import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessorService } from './professor.service';
import { ProfessorRepository } from './repository/professor-repository';

@Module({
    controllers: [ProfessorController],
    providers: [PrismaService, ProfessorService, ProfessorRepository],
    exports: [PrismaService, ProfessorService, ProfessorRepository]
})
export class ProfessorModule { }
