import { Injectable } from '@nestjs/common';
import { AlunoInput } from './model/aluno-input';
import { AlunoRepository } from './repository/aluno-repository';
import { AlunoOutput } from './model/aluno-output';

@Injectable()
export class AlunoService {

    constructor(private readonly alunoRepository: AlunoRepository) { }

    async create(input: AlunoInput) {
        return await this.alunoRepository.create(input);
    }

    async findAll() {
        return (await this.alunoRepository.findAll()).map(professor => new AlunoOutput(professor));
    }
}
