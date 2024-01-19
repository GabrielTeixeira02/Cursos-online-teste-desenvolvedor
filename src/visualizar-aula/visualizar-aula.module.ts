import { Module } from '@nestjs/common';
import { VisualizarAulaService } from './visualizar-aula.service';
import { VisualizarAulaController } from './visualizar-aula.controller';
import { VisualizarAulaRepository } from './repository/visualizar-aula.repository';
import { UsuarioModule } from 'src/cadastro/usuario/usuario.module';
import { AulaModule } from 'src/cadastro/aula/aula.module';
import { AlunoModule } from 'src/cadastro/aluno/aluno.module';
import { VisualizarAulaValidations } from './validations/visualizar-aula-validations';
import { CursoModule } from 'src/cadastro/curso/curso.module';

@Module({
  imports: [UsuarioModule, AulaModule, AlunoModule],
  controllers: [VisualizarAulaController],
  providers: [VisualizarAulaService, VisualizarAulaController, VisualizarAulaRepository, VisualizarAulaValidations],
  exports: [VisualizarAulaService, VisualizarAulaController, VisualizarAulaRepository, VisualizarAulaValidations]
})
export class VisualizarAulaModule { }
