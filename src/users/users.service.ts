import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { Model } from 'src/models/entities/model.entity';
import INetilionUser from 'src/netilion-request/interfaces/netilion-user.interface';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly cryptoService: CryptoService
  ) {}

  async getOrCreate(netilionUser: INetilionUser, refreshToken: string): Promise<User> {
    let user = await this.usersRepository.findOne(netilionUser.id);
    if (!user) {
      const encryptedRefreshToken = this.cryptoService.encryptString(refreshToken);
      user = await this.usersRepository.createUser(netilionUser, encryptedRefreshToken);
    }

    return user;
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneWithRefreshToken(id: number): Promise<User> {
    const user = await this.usersRepository.findOneWithRefreshToken(id);
    user.refreshToken = this.cryptoService.decryptString(user.refreshToken);
    return user;
  }

  async finishedInitialSetup(id: number) {
    return this.usersRepository.finishedInitialSetup(id);
  }

  async getRefreshToken(id: number) {
    const refreshToken = await this.usersRepository.getRefreshToken(id);
    return this.cryptoService.decryptString(refreshToken);
  }

  async saveRefreshToken(id: number, refreshToken: string): Promise<void> {
    const encryptedRefreshToken = this.cryptoService.encryptString(refreshToken);
    return this.usersRepository.saveRefreshToken(id, encryptedRefreshToken);
  }

  async getUserWithModel(id: number): Promise<Model> {
    const { model } = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .leftJoinAndSelect('user.model', 'model')
      .getOne();

    return model;
  }

  async encryptAllTokens(): Promise<void> {
    const users = await this.usersRepository.find();
    users.forEach(async ({ id }) => {
      const user = await this.usersRepository.findOneWithRefreshToken(id);
      user.refreshToken = this.cryptoService.encryptString(user.refreshToken);
      await user.save();
    });
  }
}
