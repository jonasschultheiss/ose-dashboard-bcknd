import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusRepository } from './status.repository';
import { StatusService } from './status.service';

@Module({
  imports: [TypeOrmModule.forFeature([StatusRepository])],
  controllers: [],
  providers: [StatusService],
  exports: [StatusService]
})
export class StatusModule {}
