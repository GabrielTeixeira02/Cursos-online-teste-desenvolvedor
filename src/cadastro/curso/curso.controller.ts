import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoInput } from './model/curso-input';
import { Auth } from 'src/auth/auth';
import { CursoAcessoInput } from './model/curso-acesso-input';

@Controller('curso')
export class CursoController {

    constructor(private cursoService: CursoService) { }

    @UseGuards(Auth)
    @Post()
    createCurso(@Headers() headers, @Body() input: CursoInput) {
        return this.cursoService.create(input, headers['user-token']);
    }

    @UseGuards(Auth)
    @Delete(':id')
    deleteCurso(@Headers() headers, @Param('id') id: bigint) {
        return this.cursoService.delete(id, headers['user-token']);
    }

    @UseGuards(Auth)
    @Patch(':id')
    atualizaCurso(@Headers() headers, @Param('id') id: bigint, @Body() input: CursoInput) {
        return this.cursoService.atualiza(id, input, headers['user-token']);
    }

    @UseGuards(Auth)
    @Get('findAll')
    findAll(@Headers() headers) {
        return this.cursoService.findAllCursos(headers['user-token']);
    }

    @UseGuards(Auth)
    @Post('acesso')
    darAcessoCurso(@Headers() headers, @Body() input: CursoAcessoInput) {
        return this.cursoService.acessoCurso(input, headers['user-token']);
    }

    @UseGuards(Auth)
    @Get('find/alunos-cadastrados/:idCurso')
    findAlunosCadastrados(@Headers() headers, @Param('idCurso') idCurso: bigint) {
        return this.cursoService.findAlunosCadastrados(headers['user-token'], idCurso);
    }

    @UseGuards(Auth)
    @Get('find/cursos-aluno')
    findCursosByAluno(@Headers() headers) {
        return this.cursoService.findCursosByAluno(headers['user-token']);
    }

}
