import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { Model } from './entities/model.entity';

@EntityRepository(Model)
export class ModelsRepository extends Repository<Model> {
  async createModel(createModelDto: CreateModelDto, user: User): Promise<Model> {
    const { name, description, location } = createModelDto;
    const model = new Model();
    model.name = name;
    model.description = description;
    model.owner = user;
    model.location = location;

    try {
      await model.save();
      return model;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Model with the same name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateModel(id: number, updateModelDto: UpdateModelDto): Promise<Model> {
    const { name, description, location } = updateModelDto;
    const model = await this.findOne(id);
    if (!model) {
      throw new NotFoundException();
    }

    if (name) {
      model.name = name;
    }

    if (description) {
      model.description = description;
    }

    if (location) {
      model.location = location;
    }

    try {
      await model.save();
      return model;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Model with the same name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<Model> {
    const { location } = updateLocationDto;
    const model = await this.findOne(id);
    model.location = location;
    try {
      await model.save();
      return model;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('Model with the same name already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
