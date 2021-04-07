import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import INetilionUser from 'src/netilion-request/interfaces/netilion-user.interface';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {}

  async getOrCreate(netilionUser: INetilionUser, refreshToken: string): Promise<User> {
    let user = await this.usersRepository.findOne(netilionUser.id);
    if (!user) {
      user = await this.usersRepository.createUser(netilionUser, refreshToken);
    }

    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async finishedInitialSetup(id: number) {
    return this.usersRepository.finishedInitialSetup(id);
  }
}
