import { Injectable, UnauthorizedException } from "@nestjs/common";
import { TipoUsuario } from "@prisma/client";
import { UsuarioService } from "src/cadastro/usuario/usuario.service";

@Injectable()
export class AulaValidations {

    constructor(
        private readonly usuarioService: UsuarioService,
    ) { }

    async validatePermissaoUsuario(usuarioAtivo: string) {
        const user = await this.usuarioService.findByNomeUsuario(usuarioAtivo);
        if (user === null || user.tipoUsuario === TipoUsuario.ALUNO) {
            throw new UnauthorizedException("Somente professores estão autorizados a fazer essa ação.");
        }
    }

}