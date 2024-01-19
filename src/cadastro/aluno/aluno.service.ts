import { Injectable, NotFoundException } from '@nestjs/common';
import { AlunoInput } from './model/aluno-input';
import { AlunoRepository } from './repository/aluno.repository';
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
        return (await this.alunoRepository.findAll()).map(aluno => new AlunoOutput(aluno));
    }

    async findById(id: bigint): Promise<AlunoOutput> {
        const aluno = await this.alunoRepository.findById(id);
        if (aluno) {
            return new AlunoOutput(aluno);
        }
        throw new NotFoundException(`Aluno com id ${id} não encontrado.`);
    }

    async findByIds(id: bigint[]): Promise<Map<bigint, string>> {
        const alunos = await this.alunoRepository.findByIds(id);
        if (alunos) {
            return new Map(alunos.map(a => [a.id, a.nome]));
        }
        throw new NotFoundException(`Alunos com ids ${id} não encontrados.`);
    }
}
