import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import INetilionUser from './interfaces/netilion-user.interface';
import IToken from './interfaces/token.interface';

@Injectable()
export class NetilionRequestService {
  constructor(private configService: ConfigService) {}
  async getCurrentUser(token: IToken): Promise<INetilionUser> {
    const { url, clientId } = this.configService.get('netilion');
    const { tokenType, accessToken } = token;

    const result = await axios.get(`${url}/users/current`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${tokenType} ${accessToken}`,
        'Api-Key': clientId
      }
    });

    return result.data;
  }

  async getAssets() {
    const baseUrl = this.configService.get('netilion.url');
    const authorization = this.configService.get('api.authorization');
    const key = this.configService.get('api.key');
    const query =
      'per_page=100&include=status%2C%20pictures%2C%20product%2C%20instrumentations%2C%20product.manufacturer';
    const res = await axios.get(`${baseUrl}/assets?${query}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${authorization}`,
        'Api-Key': key
      }
    });

    if (!res.data || !res.data.assets) {
      throw new InternalServerErrorException('Could not fetch assets');
    }

    return res.data.assets;
  }
}
