import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusDto } from './dto/status.dto';
import { StatusRepository } from './status.repository';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(StatusRepository)
    private readonly statusRepository: StatusRepository,
  ) {}

  async getOrCreateStatus(statusDto: StatusDto) {
    let status = await this.statusRepository.findOne(statusDto.id);
    if (!status) {
      status = await this.statusRepository.createStatus(statusDto);
    } else {
      status = await this.statusRepository.updateStatus(statusDto);
    }

    return status;
  }
}
