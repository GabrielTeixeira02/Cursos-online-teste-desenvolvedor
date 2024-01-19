import { Module } from '@nestjs/common';
import { UsuarioRepository } from './repository/usuario.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuarioService } from './usuario.service';

@Module({
    providers: [UsuarioRepository, PrismaService, UsuarioService],
    exports: [UsuarioRepository, UsuarioService]
})
export class UsuarioModule { }
