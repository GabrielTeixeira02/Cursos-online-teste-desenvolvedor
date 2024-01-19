import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CursoRepository } from './repository/curso-repository';
import { CursoInput } from './model/curso-input';
import { ProfessorService } from 'src/cadastro/professor/professor.service';
import { ProfessorOutput } from 'src/cadastro/professor/model/profesor-output';
import { TipoUsuario } from '@prisma/client';
import { UsuarioService } from '../usuario/usuario.service';
import { CursoValidation } from './validations/curso-validation';

@Injectable()
export class CursoService {

    constructor(private readonly cursoRepository: CursoRepository,
        private readonly validation: CursoValidation
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
        this.validation.validatePermissaoUsuario(usuarioAtivo)
        return await this.cursoRepository.findAll();
    }
}
