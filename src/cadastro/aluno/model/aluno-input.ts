import { IsNotEmpty, IsString } from "class-validator";

export class AlunoInput {

    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsString({ message: 'O nome não pode ser vazio' })
    nome: string;

    @IsNotEmpty({ message: 'O usuário não pode ser vazio' })
    @IsString({ message: 'O usuário não pode ser vazio' })
    usuario: string;
}