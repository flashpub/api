/* eslint-disable @typescript-eslint/no-var-requires */

import { Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';

const serviceAccount = require('../../../dev.json');

@Injectable()
export class FirebaseService {
  Auth: typeof FirebaseAdmin['auth'];
  Storage: typeof FirebaseAdmin['storage'];
  Firestore: typeof FirebaseAdmin['firestore'];

  constructor() {
    if (!FirebaseAdmin.apps.length) {
      FirebaseAdmin.initializeApp({
        credential: FirebaseAdmin.credential.cert(serviceAccount),
      });

      this.Auth = FirebaseAdmin.auth;
      this.Storage = FirebaseAdmin.storage;
      this.Firestore = FirebaseAdmin.firestore;
    }
  }
}
