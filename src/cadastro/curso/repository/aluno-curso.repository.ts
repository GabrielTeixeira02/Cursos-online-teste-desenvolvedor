import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CursoAcessoInput } from "../model/curso-acesso-input";
import { Ids } from "../model/ids";
import { CursoAcessoUpdateInput } from "../model/curso-acesso-update-input";

@Injectable()
export class AlunoCursoRepository {

    constructor(private readonly prisma: PrismaService) { }

    async create(input: CursoAcessoInput) {
        return await this.prisma.alunoCurso.create({ data: input });
    }

    async findAlunosCadastrados(idCurso: bigint) {
        return await this.prisma.alunoCurso.findMany({
            where: {
                idCurso: idCurso
            }
        })
    }

    async atualiza(input: CursoAcessoUpdateInput, idAluno_idCurso: Ids) {
        return await this.prisma.alunoCurso.update({ where: { idAluno_idCurso }, data: input });
    }
}