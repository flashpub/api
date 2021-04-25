import admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async CheckToken(token: string) {
    try {
      const decodedUser = await admin.auth().verifyIdToken(token);
      console.log('decodedUser', decodedUser);
    } catch (e) {}
  }
}
