import { Injectable } from '@nestjs/common';
import { CursoRepository } from './repository/curso.repository';
import { CursoInput } from './model/curso-input';
import { CursoValidation } from './validations/curso-validation';
import { CursoAcessoInput } from './model/curso-acesso-input';
import { AlunoCursoRepository } from './repository/aluno-curso.repository';
import { AlunoService } from '../aluno/aluno.service';
import { CursoOutput } from './model/curso-output';
import { AlunoCursoOutput } from './model/aluno-curso-output';
import { AulaService } from '../aula/aula.service';
import { VisualizarAulaService } from 'src/visualizar-aula/visualizar-aula.service';
import { StatusCurso } from '@prisma/client';
import { OnEvent } from '@nestjs/event-emitter';
import { AlteraStatusEvent } from './model/altera-status-event';
import { CursoAcessoUpdateInput } from './model/curso-acesso-update-input';
import { Ids } from './model/ids';

@Injectable()
export class CursoService {

    constructor(private readonly cursoRepository: CursoRepository,
        private readonly validation: CursoValidation,
        private readonly alunoCursoRepository: AlunoCursoRepository,
        private readonly aulaService: AulaService,
        private readonly visualizaAula: VisualizarAulaService
    ) { }

    async create(input: CursoInput, usuarioAtivo: string) {
        await this.validation.validateInclusaoCurso(input, usuarioAtivo);
        return await this.cursoRepository.create(input);
    }

    async delete(id: bigint, usuarioAtivo: string) {
        await this.validation.validateDeleteCurso(id, usuarioAtivo);
        return await this.cursoRepository.delete(id);
    }

    async atualiza(id: bigint, input: CursoInput, usuarioAtivo: string) {
        await this.validation.validateAtualizacaoCurso(id, input, usuarioAtivo);
        return await this.cursoRepository.atualizar(id, input);
    }

    async findAllCursos(usuarioAtivo: string) {
        await this.validation.validatePermissaoUsuario(usuarioAtivo);
        return await this.cursoRepository.findAll();
    }

    async acessoCurso(input: CursoAcessoInput, usuarioAtivo: string) {
        await this.validation.validateAcessoCurso(input, usuarioAtivo);
        return await this.alunoCursoRepository.create(input);
    }

    async findAlunosCadastrados(usuarioAtivo: string, idCurso: bigint) {
        await this.validation.validatePermissaoUsuario(usuarioAtivo)

        const curso = await this.cursoRepository.findAlunosCadastradosById(idCurso);
        return new CursoOutput(curso);
    }

    @OnEvent('alteraStatus')
    async alteraStatus(payload: AlteraStatusEvent) {
        const cursoId = (await this.aulaService.findById(payload.idAula)).idCurso;
        const status = await this.getStatusCurso(cursoId, payload.idAluno);
        await this.alunoCursoRepository.atualiza(new CursoAcessoUpdateInput(status), new Ids(cursoId, payload.idAluno));
    }

    private async getStatusCurso(idCurso: bigint, idAluno: bigint) {
        const aulas = (await this.aulaService.findByCurso(idCurso)).map(c => c.id);
        const aulasVisualizadas = await this.visualizaAula.findByAulasAndAluno(aulas, idAluno);
        if (aulas.length === aulasVisualizadas.length) {
            return StatusCurso.FINALIZADO;
        }
        if (aulasVisualizadas.length === 0) {
            return StatusCurso.NAO_INICIADO;
        }
        if (aulasVisualizadas.length != 0 && aulas.length > aulasVisualizadas.length) {
            return StatusCurso.EM_ANDAMENTO;
        }
    }

    async findCursosByAluno(usuarioAtivo: string) {
        await this.validation.validatePermissaoUsuarioAluno(usuarioAtivo);
        return await this.cursoRepository.findCursosByAluno(usuarioAtivo);
    }

}
