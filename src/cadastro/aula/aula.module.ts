import { Module } from '@nestjs/common';
import { AulaService } from './aula.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AulaRepository } from './repository/aula.repository';
import { AulaController } from './aula.controller';
import { AulaValidations } from './validations/aula-validation';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
    imports: [UsuarioModule],
    controllers: [AulaController],
    providers: [PrismaService, AulaService, AulaRepository, AulaController, AulaValidations],
    exports: [AulaService, AulaRepository, AulaController, AulaValidations]
})
export class AulaModule { }
