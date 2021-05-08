import { Request } from 'express';
import { Get, Req, Controller, UseGuards } from '@nestjs/common';

import { AppGuard } from 'src/core/app.guard';
import { AppService } from 'src/core/app.service';

@UseGuards(AppGuard)
@Controller('verify/user')
export class VerifyController {
  constructor(private readonly appService: AppService) {}

  @Get(':userId')
  async IsTokenValid(@Req() request: Request) {
    const tokenizedUid = await this.appService.CheckToken(
      request.headers['authorization'],
    );
    return tokenizedUid === 'public' || request.params.userId === tokenizedUid;
  }
}
