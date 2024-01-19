import { Injectable, NotFoundException } from '@nestjs/common';
import { VisualizarAulaInput } from './model/visualizar-aula-input';
import { VisualizarAulaRepository } from './repository/visualizar-aula.repository';
import { VisualizarAulaValidations } from './validations/visualizar-aula-validations';
import { UsuarioService } from 'src/cadastro/usuario/usuario.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AlteraStatusEvent } from 'src/cadastro/curso/model/altera-status-event';

@Injectable()
export class VisualizarAulaService {

    constructor(
        private readonly visualizarRepository: VisualizarAulaRepository,
        private readonly visualizarValidations: VisualizarAulaValidations,
        private readonly usuarioService: UsuarioService,
        private eventEmitter: EventEmitter2
    ) { }


    async visualizar(aulaId: bigint, usuarioAtivo: string) {
        const user = await this.usuarioService.findByNomeUsuario(usuarioAtivo);
        const input = new VisualizarAulaInput(user.id, aulaId);
        await this.visualizarValidations.validateVisualizarAula(input, usuarioAtivo);
        const aulaVisualizada = await this.visualizarRepository.visualizaAula(input);

        this.eventEmitter.emit('alteraStatus', new AlteraStatusEvent(user.id, aulaId));

        return aulaVisualizada;
    }

    async findByAulasAndAluno(idsAulas: bigint[], idAluno: bigint) {
        const aula = await this.visualizarRepository.findByAulaAndAluno(idsAulas, idAluno);
        if (aula) {
            return aula;
        }
        throw new NotFoundException("Não foram encontradas aulas visualizadas.");
    }
}
