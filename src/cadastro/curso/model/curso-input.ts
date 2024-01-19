import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CursoInput {

    @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
    @IsString({ message: 'O campo nome deve ser uma String.' })
    nome: string;

    @IsNotEmpty({ message: 'A descrição não pode ser vazia.' })
    @IsString({ message: 'O campo descrição deve ser uma String.' })
    descricao: string;

    banner: string;

    @IsNumber({}, { message: "O id do professor ministrante é necessário." })
    @Type(() => Number)
    idProfessor: bigint;
}