import { Injectable } from '@nestjs/common';
import * as Firestore from '@google-cloud/firestore';
import { FirebaseService } from 'src/core/firebase/firebase.service';

@Injectable()
export class PubsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async getPub(pubId: string): Promise<any> {
    const pubRef = this.firebaseService
      .Firestore()
      .collection('pubs')
      .doc(pubId);

    const pub = await pubRef.get();
    return pub.exists ? this.removeUnneededProps(pub.data()) : null;
  }

  async getPubsForAuthor(orcId: string): Promise<string[]> {
    const pubsRef = this.firebaseService.Firestore().collection('pubs');
    const pubs = await pubsRef.where('author.orcid', '==', orcId).get();

    return pubs.docs.map((x) => x.data().id);
  }

  removeUnneededProps(data: Firestore.DocumentData): any {
    if ('bookmarkedBy' in data) {
      delete data.bookmarkedBy;
    }

    return data;
  }
}
