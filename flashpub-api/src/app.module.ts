import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirestoreService } from './firestore.service';
import { PubsController } from './pubs/pubs.controller';

@Module({
  imports: [],
  controllers: [AppController, PubsController],
  providers: [AppService, FirestoreService],
})
export class AppModule {}
