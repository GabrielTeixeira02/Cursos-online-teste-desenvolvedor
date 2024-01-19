import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AlunoInput } from "../model/aluno-input";

@Injectable()
export class AlunoRepository {

    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.aluno.findMany();
    }

    async create(input: AlunoInput) {
        return await this.prisma.aluno.create({ data: input });
    }

    async findById(id: bigint) {
        return await this.prisma.aluno.findUnique({
            where: { id: id },
        })
    }

    async findByIds(id: bigint[]) {
        return await this.prisma.aluno.findMany({
            where: { id: { in: id } },
        })
    }

}
