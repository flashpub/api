import { Request } from 'express';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AppService } from './app.service';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private readonly appService: AppService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('context', context);
    const request = context.switchToHttp().getRequest() as Request;
    return this.appService.ValidateRequest(request);
  }
}
