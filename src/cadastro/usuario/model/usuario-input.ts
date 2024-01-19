import { TipoUsuario } from "@prisma/client";

export class UsuarioInput {

    constructor(nomeUsuario: string, tipoUsuario: TipoUsuario) {
        this.nome = nomeUsuario;
        this.tipoUsuario = tipoUsuario;
    }

    nome: string;

    tipoUsuario: TipoUsuario;
}