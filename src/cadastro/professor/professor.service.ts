import { Injectable } from '@nestjs/common';
import { ProfessorRepository } from './repository/professor-repository';
import { ProfessorInput } from './model/professor-input';
import { ProfessorOutput } from './model/profesor-output';
import { IsNotEmpty } from 'class-validator';

@Injectable()
export class ProfessorService {

    constructor(private readonly professorRepository: ProfessorRepository) { }

    async findAllProfessores(): Promise<ProfessorOutput[]> {
        return (await this.professorRepository.findAll()).map(professor => new ProfessorOutput(professor));
    }

    async create(input: ProfessorInput) {
        return await this.professorRepository.create(input);
    }

    async findByUsuario(usuario: string): Promise<ProfessorOutput> {
        return new ProfessorOutput(await this.professorRepository.findByUsuario(usuario));
    }
}
