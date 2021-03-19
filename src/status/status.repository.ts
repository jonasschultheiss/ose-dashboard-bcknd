import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { StatusDto } from './dto/status.dto';
import { Status } from './entities/status.entity';

@EntityRepository(Status)
export class StatusRepository extends Repository<Status> {
  async createStatus(statusDto: StatusDto): Promise<Status> {
    const { id, code, name, description } = statusDto;

    const status = new Status();
    status.id = id;
    status.code = code;
    status.name = name;
    status.description = description;

    try {
      await status.save();
      return status;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Status with the same code or name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateStatus(statusDto: StatusDto): Promise<Status> {
    const { id, code, name, description } = statusDto;
    const status = await this.findOne(id);
    let needsSave = false;
    if (status.code !== code) {
      status.code = code;
      needsSave = true;
    }

    if (status.name !== name) {
      status.name = name;
      needsSave = true;
    }

    if (status.description !== description) {
      status.description = description;
      needsSave = true;
    }

    if (needsSave) {
      try {
        await status.save();
        return status;
      } catch (error) {
        throw new InternalServerErrorException();
      }
    } else {
      return status;
    }
  }
}
