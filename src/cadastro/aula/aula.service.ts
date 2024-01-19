import { Injectable, NotFoundException } from '@nestjs/common';
import { AulaRepository } from './repository/aula.repository';
import { AulaValidations } from './validations/aula-validation';
import { AulasInput } from './model/aulas-input';

@Injectable()
export class AulaService {

    constructor(
        private readonly aulaRepository: AulaRepository,
        private readonly validations: AulaValidations
    ) { }

    async create(input: AulasInput, usuarioAtivo: string) {
        await this.validations.validatePermissaoUsuario(usuarioAtivo);
        input.aulas.forEach(async a => await this.aulaRepository.create(a))
    }

    async findById(id: bigint) {
        const aula = await this.aulaRepository.findById(id);
        if (aula) {
            return aula;
        }
        throw new NotFoundException(`Aula com id ${id} não encontrado.`);
    }

    async findByCurso(idCurso: bigint) {
        const aula = await this.aulaRepository.findByCurso(idCurso);
        if (aula) {
            return aula;
        }
        throw new NotFoundException(`Não foram encontradas aulas associadas ao curso de id ${idCurso} não encontrado.`);
    }

}
