import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfessorRepository } from './repository/professor.repository';
import { ProfessorInput } from './model/professor-input';
import { ProfessorOutput } from './model/profesor-output';
import { IsNotEmpty } from 'class-validator';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioInput } from '../usuario/model/usuario-input';
import { TipoUsuario } from '@prisma/client';

@Injectable()
export class ProfessorService {

    constructor(
        private readonly professorRepository: ProfessorRepository,
        private readonly usuarioService: UsuarioService
    ) { }

    async findAllProfessores(): Promise<ProfessorOutput[]> {
        return (await this.professorRepository.findAll()).map(professor => new ProfessorOutput(professor));
    }

    async create(input: ProfessorInput) {
        await this.usuarioService.create(new UsuarioInput(input.nomeUsuario, TipoUsuario.PROFESSOR));
        return await this.professorRepository.create(input);
    }

    async findById(id: bigint): Promise<ProfessorOutput> {
        const professor = await this.professorRepository.findById(id);
        if (professor) {
            return new ProfessorOutput(professor);
        }
        throw new NotFoundException(`Professor com id ${id} não encontrado.`);
    }
}
