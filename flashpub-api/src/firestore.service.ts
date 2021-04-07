import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as Firestore from '@google-cloud/firestore';


@Injectable()
export class FirestoreService {

    private database: Firestore.Firestore;

    constructor() {
        admin.initializeApp();
        this.database = admin.firestore();
    }

    async getPub(pubId: string): Promise<any> {
        const pubRef = this.database.collection('pubs').doc(pubId);
        return await pubRef.get();
    }
}

