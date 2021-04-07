import { Test, TestingModule } from '@nestjs/testing';
import { PubsController } from './pubs.controller';

describe('PubsController', () => {
  let controller: PubsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PubsController],
    }).compile();

    controller = module.get<PubsController>(PubsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
