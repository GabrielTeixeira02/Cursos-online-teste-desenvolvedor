import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class Auth implements CanActivate {

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const headers: Record<string, string> = context.switchToHttp().getRequest().headers;
            if (!headers || !headers['user-token']) {
                throw new UnauthorizedException('Por favor informe o token do usuário.');
            }
            return true;
        } catch (error) {
            console.error('Auth error - ', error.message);
            throw new UnauthorizedException(error.message);
        }
    }

}