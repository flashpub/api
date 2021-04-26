import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import * as Firestore from '@google-cloud/firestore';


@Injectable()
export class FirestoreService {

    private database: Firestore.Firestore;

    constructor() {
        // Seems like the firebase admin lifecycle is longer than
        // this service for some reason. Calling 
        // admin.initializeApp() when it's already 
        // initialized results in an exception.
        // So we'll test to see if it's already 
        // initialized first.
        if (!admin.apps.length) {
            admin.initializeApp();
        }

        this.database = admin.firestore();
    }

    async getPub(pubId: string): Promise<any> {
        const pubRef = this.database.collection('pubs').doc(pubId);

        const pub = (await pubRef.get());
        return pub.exists ? this.removeUnneededProps(pub.data()) : null;
    }

    async getPubsForAuthor(orcId: string): Promise<string[]> {
        const pubsRef = this.database.collection('pubs');
        const pubs = await pubsRef.where('author.orcid', '==', orcId).get();

        console.log(JSON.stringify(pubs));

        return pubs.docs.map(x=>x.data().id);
    }

    removeUnneededProps(data: Firestore.DocumentData): any {
        if('bookmarkedBy' in data){
            delete data.bookmarkedBy;
        }

        return data;
    }
}



