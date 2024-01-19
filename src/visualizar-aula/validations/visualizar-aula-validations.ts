import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioService } from "src/cadastro/usuario/usuario.service";
import { VisualizarAulaInput } from "../model/visualizar-aula-input";
import { TipoUsuario } from "@prisma/client";
import { AlunoService } from "src/cadastro/aluno/aluno.service";
import { AulaService } from "src/cadastro/aula/aula.service";

@Injectable()
export class VisualizarAulaValidations {

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly alunoService: AlunoService,
        private readonly aulaService: AulaService,
    ) { }

    async validateVisualizarAula(input: VisualizarAulaInput, usuarioAtivo: string) {
        await this.validatePermissaoUsuario(usuarioAtivo);
        await this.validateAula(input.idAula);
        await this.validateAluno(input.idAluno);
    }

    async validatePermissaoUsuario(usuarioAtivo: string) {
        const user = await this.usuarioService.findByNomeUsuario(usuarioAtivo);
        if (user === null || user.tipoUsuario === TipoUsuario.PROFESSOR) {
            throw new UnauthorizedException("Somente alunos estão autorizados a fazer essa ação.");
        }
    }

    private async validateAluno(idAluno: bigint) {
        if (idAluno) {
            return await this.alunoService.findById(idAluno);
        }
    }

    private async validateAula(idAula: bigint) {
        if (idAula) {
            return await this.aulaService.findById(idAula);
        }
    }
}