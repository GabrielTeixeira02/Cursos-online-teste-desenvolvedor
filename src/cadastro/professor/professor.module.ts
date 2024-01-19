import { Module } from '@nestjs/common';
import { ProfessorController } from './professor.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessorService } from './professor.service';
import { ProfessorRepository } from './repository/professor.repository';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [UsuarioModule],
    controllers: [ProfessorController],
    providers: [PrismaService, ProfessorService, ProfessorRepository],
    exports: [PrismaService, ProfessorService, ProfessorRepository]
})
export class ProfessorModule { }
