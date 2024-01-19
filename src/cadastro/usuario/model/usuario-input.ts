import { TipoUsuario } from "@prisma/client";

export class UsuarioInput {

    constructor(nomeUsuario: string) {
        this.nome = nomeUsuario;
    }

    nome: string;

    tipoUsuario: TipoUsuario = TipoUsuario.PROFESSOR;
}