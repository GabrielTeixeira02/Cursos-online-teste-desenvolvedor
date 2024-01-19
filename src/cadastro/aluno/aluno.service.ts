import { Injectable } from '@nestjs/common';
import { AlunoInput } from './model/aluno-input';
import { AlunoRepository } from './repository/aluno-repository';
import { AlunoOutput } from './model/aluno-output';
import { UsuarioInput } from '../usuario/model/usuario-input';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AlunoService {

    constructor(
        private readonly alunoRepository: AlunoRepository,
        private readonly usuarioService: UsuarioService
    ) { }

    async create(input: AlunoInput) {
        await this.usuarioService.create(new UsuarioInput(input.nomeUsuario));
        return await this.alunoRepository.create(input);
    }

    async findAll() {
        return (await this.alunoRepository.findAll()).map(professor => new AlunoOutput(professor));
    }
}
