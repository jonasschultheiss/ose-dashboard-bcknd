import { ConflictException, InternalServerErrorException } from '@nestjs/common';
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

  async userFinishedSetup(id: number) {
    const user = await this.findOne(id);
    user.finishedInitialSetup = true;
    await user.save();
    return user;
  }
}
