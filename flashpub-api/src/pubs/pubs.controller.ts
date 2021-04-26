import { Controller, Get, Param, Headers, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/auth.guard';
import { FirestoreService } from '../firestore.service';

@Controller('v1/pubs')
export class PubsController {
    constructor(private readonly firestoreService: FirestoreService) {
    }

    @UseGuards(AuthGuard)
    @Get(':pubId')
    async getPub(@Param() params): Promise<any> {
        
        const pub = await this.firestoreService.getPub(params.pubId);

        if(!pub)
        {
            throw new NotFoundException();
        }

        return pub;
    }

    @UseGuards(AuthGuard)
    @Get('forOrcId/:orcId')
    async getPubsForAuthor(@Param() params): Promise<any> {
        
        const pubs = await this.firestoreService.getPubsForAuthor(params.orcId);

        if(!pubs)
        {
            throw new NotFoundException();
        }

        return pubs;
    }
}
