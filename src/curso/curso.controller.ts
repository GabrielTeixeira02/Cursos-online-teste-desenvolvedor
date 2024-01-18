import { Body, Controller, Post } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoInput } from './model/curso-input';

@Controller('curso')
export class CursoController {

    constructor(private cursoService: CursoService) { }

    @Post()
    createCurso(@Body() input: CursoInput) {
        return this.cursoService.create(input);
    }

}
