import { StatusCurso } from "@prisma/client";
import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CursoAcessoInput {

    status: StatusCurso;

    @IsNumber({}, { message: "O id do aluno é necessário." })
    @Type(() => Number)
    idAluno: bigint;

    @IsNumber({}, { message: "O id do curso é necessário." })
    @Type(() => Number)
    idCurso: bigint;
}