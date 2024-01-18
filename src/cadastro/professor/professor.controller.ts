import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfessorService } from './professor.service';
import { ProfessorInput } from './model/professor-input';

@Controller('professor')
export class ProfessorController {

    constructor(private professorService: ProfessorService) { }

    @Get('findAll')
    findAll() {
        return this.professorService.findAllProfessores();
    }

    @Post()
    createProfessor(@Body() input: ProfessorInput) {
        return this.professorService.create(input);
    }
}
