import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CursoInput } from "../model/curso-input";

@Injectable()
export class CursoRepository {

    constructor(private readonly prisma: PrismaService) { }

    async create(input: CursoInput) {
        return await this.prisma.curso.create({ data: input });
    }

    async delete(id: bigint) {
        return await this.prisma.curso.delete({ where: { id } });
    }

    async atualizar(id: bigint, input: CursoInput) {
        return await this.prisma.curso.update({ where: { id }, data: input });
    }

    async findById(id: bigint) {
        return await this.prisma.curso.findUnique({
            where: { id: id },
        })
    }

    async findAlunosCadastradosById(id: bigint) {
        return await this.prisma.curso.findUnique({
            where: { id: id },
            select: {
                nome: true,
                AlunoCurso: {
                    select: {
                        aluno: true,
                        status: true
                    }
                }
            }
        })
    }

    async findAll() {
        return await this.prisma.curso.findMany({
            select: {
                id: true,
                nome: true,
                descricao: true,
                banner: true,
                professor: true,
                aulas: true,
                AlunoCurso: {
                    select: {
                        aluno: true
                    }
                }
            },
        });
    }

    async findCursosByAluno(userAluno: string) {
        return await this.prisma.curso.findMany({
            where: {
                AlunoCurso: {
                    some: {
                        aluno: {
                            nomeUsuario: {
                                equals: userAluno
                            }
                        },
                    },
                },
            }
        })
    }
}
