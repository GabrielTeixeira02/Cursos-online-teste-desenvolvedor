import { Body, Controller, Get, Post } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoInput } from './model/aluno-input';

@Controller('aluno')
export class AlunoController {

    constructor(private alunoService: AlunoService) { }

    @Get('findAll')
    findAll() {
        return this.alunoService.findAll();
    }

    @Post()
    createAluno(@Body() input: AlunoInput) {
        return this.alunoService.create(input);
    }

}
