import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UsuarioInput } from "../model/usuario-input";

@Injectable()
export class UsuarioRepository {

     constructor(private readonly prisma: PrismaService) { }

     async create(input: UsuarioInput) {
          return await this.prisma.usuario.create({ data: input });
     }

     async findByUsuario(nome: string) {
          return await this.prisma.usuario.findUnique({
               where: { nome },
          })
     }
}