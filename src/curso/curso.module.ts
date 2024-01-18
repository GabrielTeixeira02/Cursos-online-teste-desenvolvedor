import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoRepository } from './repository/curso-repository';
import { CursoController } from './curso.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessorService } from 'src/cadastro/professor/professor.service';
import { ProfessorRepository } from 'src/cadastro/professor/repository/professor-repository';

@Module({
  controllers: [CursoController],
  providers: [PrismaService, CursoService, CursoRepository, ProfessorService, ProfessorRepository],
  exports: [CursoService, CursoRepository]
})
export class CursoModule { }
