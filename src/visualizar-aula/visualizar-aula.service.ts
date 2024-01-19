import { Injectable, NotFoundException } from '@nestjs/common';
import { VisualizarAulaInput } from './model/visualizar-aula-input';
import { VisualizarAulaRepository } from './repository/visualizar-aula.repository';
import { VisualizarAulaValidations } from './validations/visualizar-aula-validations';
import { UsuarioService } from 'src/cadastro/usuario/usuario.service';

@Injectable()
export class VisualizarAulaService {

    constructor(
        private readonly visualizarRepository: VisualizarAulaRepository,
        private readonly visualizarValidations: VisualizarAulaValidations,
        private readonly usuarioService: UsuarioService,
    ) { }


    async visualizar(aulaId: bigint, usuarioAtivo: string) {
        const user = await this.usuarioService.findByNomeUsuario(usuarioAtivo);
        const input = new VisualizarAulaInput(user.id, aulaId);
        await this.visualizarValidations.validateVisualizarAula(input, usuarioAtivo);
        return await this.visualizarRepository.visualizaAula(input);
    }

    async findByAulas(idsAulas: bigint[]) {
        const aula = await this.visualizarRepository.findByCurso(idsAulas);
        if (aula) {
            return aula;
        }
        throw new NotFoundException("Não foram encontradas aulas visualizadas.");
    }
}
