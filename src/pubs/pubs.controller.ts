import {
  Controller,
  Get,
  Req,
  UseGuards,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Request } from 'express';

import { AppGuard } from 'src/core/app.guard';
import { AppService } from 'src/core/app.service';
import { PubsService } from './pubs.service';

@Controller('v1/pubs')
export class PubsController {
  constructor(
    private readonly pubsService: PubsService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(AppGuard)
  @Get(':pubId')
  async getPub(@Req() request: Request) {
    const token = await this.appService.CheckToken(
      request.headers['authorization'],
    );

    if (token) {
      const pub = await this.pubsService.getPub(request.params.pubId);
      if (!pub) throw new NotFoundException();
      return pub;
    }
  }

  @UseGuards(AppGuard)
  @Get('forOrcId/:orcId')
  async getPubsForAuthor(@Param() params): Promise<any> {
    const pubs = await this.pubsService.getPubsForAuthor(params.orcId);
    if (!pubs) throw new NotFoundException();
    return pubs;
  }
}
