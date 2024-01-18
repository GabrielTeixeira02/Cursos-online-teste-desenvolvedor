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
}
