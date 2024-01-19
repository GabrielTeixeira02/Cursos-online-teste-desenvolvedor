import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProfessorInput } from "../model/professor-input";

@Injectable()
export class ProfessorRepository {

    constructor(private readonly prisma: PrismaService) { }

    findAll() {
        return this.prisma.professor.findMany();
    }

    async create(input: ProfessorInput) {
        return await this.prisma.professor.create({ data: input });
    }

    async findById(id: bigint) {
        return await this.prisma.professor.findUnique({
            where: { id: id },
        })
    }

}
