import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import IRequestConfig from './interfaces/request-credentials.interface';

@Injectable()
export class NetilionRequestService {
  constructor(private configService: ConfigService) {}
  async getTechnicalUser(credentials: IRequestConfig, email: string) {
    const { tokenType, accessToken, clientId } = credentials;
    const url = this.configService.get('netilion.url');
    let res;
    try {
      res = await axios.get(`${url}/technical_users?email=${encodeURIComponent(email)}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${tokenType} ${accessToken}`,
          'Api-Key': clientId,
        },
      });
    } catch (error) {
      console.log(
        '🚀 ~ file: netilion-request.service.ts ~ line 21 ~ NetilionRequestService ~ getTechnicalUser ~ error',
        error,
      );
    }
    console.log(
      '🚀 ~ file: netilion-request.service.ts ~ line 17 ~ NetilionRequestService ~ getTechnicalUser ~ res',
      res.data,
    );
  }

  async getAssets() {
    const baseUrl = this.configService.get('netilion.url');
    const authorization = this.configService.get('api.authorization');
    const key = this.configService.get('api.key');
    const res = await axios.get(
      `${baseUrl}/assets?per_page=100&include=status%2C%20pictures%2C%20product%2C%20instrumentations%2C%20product.manufacturer`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${authorization}`,
          'Api-Key': key,
        },
      },
    );

    if (!res.data || !res.data.assets) {
      throw new InternalServerErrorException('Could not fetch assets');
    }

    return res.data.assets;
  }
}
