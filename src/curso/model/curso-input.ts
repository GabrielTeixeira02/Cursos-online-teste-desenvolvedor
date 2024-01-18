import { IsNotEmpty, IsString } from "class-validator";

export class CursoInput {

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsString({ message: 'O campo nome deve ser uma String' })
    nome: string;

    @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
    @IsString({ message: 'O campo descrição deve ser uma String' })
    descricao: string;

    banner: string;

    @IsNotEmpty({ message: 'O usuário do professor ministrante não pode ser vazio' })
    @IsString({ message: 'O campo usuário professor ministrante deve ser uma String' })
    usuarioProfessorMinistrante: string;

    idProfessor: number;
}