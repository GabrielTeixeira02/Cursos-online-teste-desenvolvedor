import { Injectable } from '@nestjs/common';
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

}
