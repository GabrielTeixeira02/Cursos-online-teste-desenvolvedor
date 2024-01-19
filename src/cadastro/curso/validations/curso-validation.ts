import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ProfessorService } from "src/cadastro/professor/professor.service";
import { CursoInput } from "../model/curso-input";
import { UsuarioService } from "src/cadastro/usuario/usuario.service";
import { TipoUsuario } from "@prisma/client";
import { CursoRepository } from "../repository/curso.repository";
import { CursoAcessoInput } from "../model/curso-acesso-input";
import { AlunoService } from "src/cadastro/aluno/aluno.service";

@Injectable()
export class CursoValidation {

    constructor(
        private readonly professorService: ProfessorService,
        private readonly usuarioService: UsuarioService,
        private readonly cursoReposiory: CursoRepository,
        private readonly alunoService: AlunoService
    ) { }

    async validateAcessoCurso(input: CursoAcessoInput, usuarioAtivo: string) {
        await this.validatePermissaoUsuario(usuarioAtivo);
        await this.validateSeCursoExiste(input.idCurso, 'dar acesso');
        await this.validateAluno(input.idAluno);
    }

    async validateAtualizacaoCurso(id: bigint, input: CursoInput, usuarioAtivo: string) {
        await this.validatePermissaoUsuario(usuarioAtivo);
        await this.validateSeCursoExiste(id, 'atualizar');
    }

    async validateInclusaoCurso(input: CursoInput, usuarioAtivo: string) {
        await this.validatePermissaoUsuario(usuarioAtivo);
        await this.validateProfessor(input.idProfessor);
    }

    async validateDeleteCurso(id: bigint, usuarioAtivo: string) {
        await this.validatePermissaoUsuario(usuarioAtivo);
        await this.validateSeCursoExiste(id, 'excluir');
    }

    async validatePermissaoUsuario(usuarioAtivo: string) {
        const user = await this.usuarioService.findByNomeUsuario(usuarioAtivo);
        if (user === null || user.tipoUsuario === TipoUsuario.ALUNO) {
            throw new UnauthorizedException("Somente professores estão autorizados a fazer essa ação.");
        }
    }

    private async validateSeCursoExiste(id: bigint, acao: string) {
        if (!(await this.cursoReposiory.findById(id))) {
            throw new NotFoundException(`Não é possível ${acao}, curso com id ${id} não encontrado`);
        }
    }

    private async validateProfessor(idProfessor: bigint) {
        if (idProfessor) {
            return await this.professorService.findById(idProfessor);
        }
    }

    private async validateAluno(idAluno: bigint) {
        if (idAluno) {
            return await this.alunoService.findById(idAluno);
        }
    }
}