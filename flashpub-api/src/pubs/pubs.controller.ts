import { Controller, Get } from '@nestjs/common';
import { FirestoreService } from 'src/firestore.service';

@Controller('pubs')
export class PubsController {
    constructor(private readonly firestoreService: FirestoreService) {
    }

    @Get()
    async getPub(pubId: string): Promise<any> {
        return await this.firestoreService.getPub(pubId);
    }
}
