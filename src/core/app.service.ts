import { Request } from 'express';
import { Observable } from 'rxjs';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import * as FirebaseAdmin from 'firebase-admin';

@Injectable()
export class AppService {
  ValidateRequest(
    request: Request,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!request.headers['authorization']) {
      throw new HttpException(
        `flashpubAPI: 'authorization' header is missing!`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }

  async CheckToken(token: string) {
    const publicToken =
      'iwy81nEmhTD9qXbiX0Q32HDZ37vzGS7Dzu5Mk44uWQTBH5YegfUrIOLdsrLHqsZs';
    if (token.includes(publicToken)) return 'public';

    try {
      const decodedUser = await FirebaseAdmin.auth().verifyIdToken(token);
      return decodedUser.uid;
    } catch (e) {
      throw new HttpException(
        `flashpubAPI: Bad token. ${e.message.split('.')[0]}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
