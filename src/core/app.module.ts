import { Module } from '@nestjs/common';

import { AppGuard } from './app.guard';
import { AppService } from './app.service';

import { VerifyService } from 'src/verify/verify.service';
import { VerifyController } from 'src/verify/verify.controller';

import { PubsService } from 'src/pubs/pubs.service';
import { PubsController } from 'src/pubs/pubs.controller';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [VerifyController, PubsController],
  providers: [VerifyService, AppGuard, AppService, PubsService],
})
export class AppModule {}
