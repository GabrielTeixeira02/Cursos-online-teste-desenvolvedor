import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CursoRepository } from './repository/curso-repository';
import { CursoInput } from './model/curso-input';
import { ProfessorService } from 'src/cadastro/professor/professor.service';
import { ProfessorOutput } from 'src/cadastro/professor/model/profesor-output';
import { TipoUsuario } from '@prisma/client';

@Injectable()
export class CursoService {

    constructor(private readonly cursoRepository: CursoRepository,
        private readonly professorService: ProfessorService
    ) { }


    async create(input: CursoInput) {
        const professor = (await this.professorService.findByUsuario(input.usuarioProfessorMinistrante));
        if (professor.tipoUsuario === TipoUsuario.PROFESSOR) {
            input.idProfessor = professor.id;
            return await this.cursoRepository.create(input)
        }

        throw new UnauthorizedException("Somente professores estão autorizados a criarem cursos.");
    }
}
