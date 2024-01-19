import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { VisualizarAulaInput } from "../model/visualizar-aula-input";

@Injectable()
export class VisualizarAulaRepository {

    constructor(private readonly prisma: PrismaService) { }

    async visualizaAula(input: VisualizarAulaInput) {
        return await this.prisma.aulasVisualizadas.create({ data: input });
    }

    async findByAulaAndAluno(idAula: bigint[], idAluno: bigint) {
        return await this.prisma.aulasVisualizadas.findMany({
            where: {
                idAula: { in: idAula },
                idAluno: idAluno
            },
        })
    }

}