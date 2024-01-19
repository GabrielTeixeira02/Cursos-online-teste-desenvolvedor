import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
    ConflictException,
    BadRequestException,
    HttpException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError(err => {
                    console.error(err);
                    throw this.getError(err);
                }),
            );
    }

    private getError(error) {
        if (error.code === 'P2002') {
            return new ConflictException('Usuário já existente.');
        }

        if (error instanceof BadRequestException) {
            error.message = ((error.getResponse()['message']).toString());
            return error;
        }

        return new BadGatewayException(error.message);
    }

}
