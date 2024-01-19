import { Injectable, NotFoundException } from "@nestjs/common";
import { UsuarioRepository } from "./repository/usuario.repository";
import { UsuarioInput } from "./model/usuario-input";

@Injectable()
export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) { }

    async create(input: UsuarioInput) {
        return await this.usuarioRepository.create(input);
    }

    async findByNomeUsuario(nome: string) {
        const usuario = (await this.usuarioRepository.findByUsuario(nome));
        if (usuario) {
            return usuario;
        }
        throw new NotFoundException(`usuário ${nome} não encontrado`);

    }
}