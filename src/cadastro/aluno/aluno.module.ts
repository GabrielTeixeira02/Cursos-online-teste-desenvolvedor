import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlunoRepository } from './repository/aluno.repository';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [AlunoController],
  providers: [AlunoService, PrismaService, AlunoRepository],
  exports: [AlunoService, PrismaService, AlunoRepository]
})
export class AlunoModule { }
