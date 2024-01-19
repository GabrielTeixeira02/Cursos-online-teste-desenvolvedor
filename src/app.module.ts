import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfessorModule } from './cadastro/professor/professor.module';
import { AlunoController } from './cadastro/aluno/aluno.controller';
import { AlunoModule } from './cadastro/aluno/aluno.module';
import { CursoController } from './cadastro/curso/curso.controller';
import { CursoModule } from './cadastro/curso/curso.module';
import { UsuarioModule } from './cadastro/usuario/usuario.module';

@Module({
  imports: [ProfessorModule, AlunoModule, CursoModule, UsuarioModule],
  controllers: [AppController, AlunoController, CursoController],
  providers: [
    AppService
  ],
})
export class AppModule { }
