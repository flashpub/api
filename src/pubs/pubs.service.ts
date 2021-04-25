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

  removeUnneededProps(data: Firestore.DocumentData): any {
    if ('bookmarkedBy' in data) {
      delete data.bookmarkedBy;
    }

    return data;
  }
}
