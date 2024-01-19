import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoRepository } from './repository/curso-repository';
import { CursoController } from './curso.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessorModule } from '../professor/professor.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { CursoValidation } from './validations/curso-validation';

@Module({
  imports: [ProfessorModule, UsuarioModule],
  controllers: [CursoController],
  providers: [PrismaService, CursoService, CursoRepository, CursoValidation],
  exports: [CursoService, CursoRepository, CursoValidation]
})
export class CursoModule { }
