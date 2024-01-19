import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class AulaInput {

    link: string;
    conteudo: string;
    arquivo: string;

    @IsNumber({}, { message: "O id do curso é necessário." })
    @Type(() => Number)
    idCurso: bigint;
}