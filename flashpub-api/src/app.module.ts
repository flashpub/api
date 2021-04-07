import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthenticationService } from './authentication.service';
import { FirestoreService } from './firestore.service';
import { PubsController } from './pubs/pubs.controller';

@Module({
  imports: [],
  controllers: [PubsController],
  providers: [FirestoreService, AuthenticationService, AuthGuard],
})
export class AppModule {}
