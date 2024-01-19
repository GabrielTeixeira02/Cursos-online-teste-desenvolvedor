import { Module } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoRepository } from './repository/curso.repository';
import { CursoController } from './curso.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfessorModule } from '../professor/professor.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { CursoValidation } from './validations/curso-validation';
import { AlunoModule } from '../aluno/aluno.module';
import { AlunoCursoRepository } from './repository/aluno-curso.repository';
import { AulaModule } from '../aula/aula.module';
import { VisualizarAulaModule } from 'src/visualizar-aula/visualizar-aula.module';

@Module({
  imports: [ProfessorModule, UsuarioModule, AlunoModule, AulaModule, VisualizarAulaModule],
  controllers: [CursoController],
  providers: [PrismaService, CursoService, CursoRepository, CursoValidation, AlunoCursoRepository],
  exports: [CursoService, CursoRepository, CursoValidation]
})
export class CursoModule { }
