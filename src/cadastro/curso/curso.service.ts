import { Injectable } from '@nestjs/common';
import { CursoRepository } from './repository/curso.repository';
import { CursoInput } from './model/curso-input';
import { CursoValidation } from './validations/curso-validation';
import { CursoAcessoInput } from './model/curso-acesso-input';
import { AlunoCursoRepository } from './repository/aluno-curso.repository';
import { AlunoService } from '../aluno/aluno.service';
import { CursoOutput } from './model/curso-output';
import { AlunoCursoOutput } from './model/aluno-curso-output';

@Injectable()
export class CursoService {

    constructor(private readonly cursoRepository: CursoRepository,
        private readonly validation: CursoValidation,
        private readonly alunoCursoRepository: AlunoCursoRepository,
        private readonly alunoService: AlunoService
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
        await this.validation.validatePermissaoUsuario(usuarioAtivo)
        return await this.cursoRepository.findAll();
    }

    async acessoCurso(input: CursoAcessoInput, usuarioAtivo: string) {
        await this.validation.validateAcessoCurso(input, usuarioAtivo);
        return await this.alunoCursoRepository.create(input);
    }

    async findAlunosCadastrados(usuarioAtivo: string, idCurso: bigint) {
        await this.validation.validatePermissaoUsuario(usuarioAtivo)

        let cursoOutput: CursoOutput = new CursoOutput();
        const alunoCurso = await this.alunoCursoRepository.findAlunosCadastrados(idCurso);
        const alunosIdsList = alunoCurso.map(alunoCurso => alunoCurso.idAluno);
        const alunos = await this.alunoService.findByIds(alunosIdsList);
        cursoOutput.nomeCurso = (await this.cursoRepository.findById(idCurso)).nome;

        alunoCurso.forEach(a => {
            const nomeAluno = alunos.get(a.idAluno).toString();
            cursoOutput.alunos.push(new AlunoCursoOutput(nomeAluno, a.status.toLocaleLowerCase()));
            console.log(cursoOutput)
        })
        return cursoOutput;
    }
}
