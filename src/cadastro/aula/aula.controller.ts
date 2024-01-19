import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AulaService } from './aula.service';
import { Auth } from 'src/auth/auth';
import { AulasInput } from './model/aulas-input';

@Controller('aula')
export class AulaController {

    constructor(private aulaService: AulaService) { }

    @UseGuards(Auth)
    @Post()
    createAula(@Headers() headers, @Body() input: AulasInput) {
        return this.aulaService.create(input, headers['user-token']);
    }
}
