import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authenticationService: AuthenticationService) {

    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    validateRequest(request: any): boolean | Promise<boolean> | Observable<boolean> {
        if(!request.headers['authorization'] || !this.authenticationService.IsValidToken(request.headers['authorization']))
        {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        return true;
    }
}


