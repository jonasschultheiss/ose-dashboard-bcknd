import { Module } from '@nestjs/common';
import { NetilionRequestModule } from 'src/netilion-request/netilion-request.module';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';

@Module({
  imports: [NetilionRequestModule],
  controllers: [ModelsController],
  providers: [ModelsService]
})
export class ModelsModule {}
