import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import * as FirebaseAdmin from 'firebase-admin';

@Injectable()
export class VerifyService {
  async CheckToken(token: string) {
    const publicToken =
      'iwy81nEmhTD9qXbiX0Q32HDZ37vzGS7Dzu5Mk44uWQTBH5YegfUrIOLdsrLHqsZs';
    if (token.includes(publicToken)) return 'public';

    console.log('token', token);

    try {
      const decodedUser = await FirebaseAdmin.auth().verifyIdToken(token);
      return decodedUser.uid;
    } catch (e) {
      throw new HttpException(
        `FlashpubQuery: Possible bad token format. ${e.message.split('.')[0]}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
