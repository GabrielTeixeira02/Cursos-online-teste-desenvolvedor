import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AulaInput } from "../model/aula-input";

@Injectable()
export class AulaRepository {

    constructor(private readonly prismaService: PrismaService) { }

    async create(input: AulaInput) {
        return await this.prismaService.aula.create({ data: input });
    }

    async findById(id: bigint) {
        return await this.prismaService.aula.findUnique({
            where: { id: id },
        })
    }

    async findByCurso(idCurso: bigint) {
        return await this.prismaService.aula.findMany({
            where: { idCurso: idCurso },
        })
    }
}