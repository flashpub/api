import { Controller, Get, Param, Headers, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { FirestoreService } from '../firestore.service';

@Controller('pubs')
export class PubsController {
    constructor(private readonly firestoreService: FirestoreService) {
    }

    @UseGuards(AuthGuard)
    @Get(':pubId')
    async getPub(@Param() params, @Headers() headers): Promise<any> {
        
        const pub = await this.firestoreService.getPub(params.pubId);

        if(!pub)
        {
            throw new NotFoundException();
        }

        return pub;
    }
}
