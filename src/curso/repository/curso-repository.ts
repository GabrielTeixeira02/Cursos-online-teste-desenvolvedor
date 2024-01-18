import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CursoInput } from "../model/curso-input";

@Injectable()
export class CursoRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(input: CursoInput) {
        return await this.prisma.curso.create({ data: input });
    }
}
