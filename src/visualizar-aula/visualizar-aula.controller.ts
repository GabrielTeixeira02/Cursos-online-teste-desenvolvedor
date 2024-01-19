import { Body, Controller, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { VisualizarAulaService } from './visualizar-aula.service';
import { VisualizarAulaInput } from './model/visualizar-aula-input';
import { Auth } from 'src/auth/auth';

@Controller('visualizar-aula')
export class VisualizarAulaController {

    constructor(private visualizarService: VisualizarAulaService) { }

    @UseGuards(Auth)
    @Patch(':aulaId')
    createCurso(@Headers() headers, @Param('aulaId') aulaId: bigint) {
        return this.visualizarService.visualizar(aulaId, headers['user-token']);
    }
}
