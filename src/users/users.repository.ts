import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import INetilionUser from 'src/netilion-request/interfaces/netilion-user.interface';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(netilionUser: INetilionUser, refreshToken: string) {
    const { id, email } = netilionUser;
    const user = new User();
    user.id = id;
    user.email = email;
    user.finishedInitialSetup = false;
    user.refreshToken = refreshToken;

    try {
      await user.save();
      return user;
    } catch (error) {
      if (error.code == 23505) {
        throw new ConflictException('User with the same id already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async finishedInitialSetup(id: number): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    user.finishedInitialSetup = true;
    try {
      await user.save();
      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async getRefreshToken(id: number): Promise<string> {
    const user = await this.findOne(id, {
      select: ['refreshToken']
    });

    return user.refreshToken;
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ${id} not found`);
    }

    user.refreshToken = refreshToken;
    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOneWithRefreshToken(id: number): Promise<User> {
    return this.createQueryBuilder('user').addSelect('user.refreshToken').where('user.id = :id', { id }).getOne();
  }

  async saveRefreshToken(id: number, refreshToken: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }

    user.refreshToken = refreshToken;
    try {
      await user.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
