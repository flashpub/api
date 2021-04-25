import {
  Controller,
  Get,
  Req,
  UseGuards,
  NotFoundException,
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
}
