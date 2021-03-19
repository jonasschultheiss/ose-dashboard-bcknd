import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cache } from 'cache-manager';
import ICredentials from './interfaces/credentials.interface';
import ITokenResponse from './interfaces/token-response.interface';
import IToken from './interfaces/token.interface';

@Injectable()
export class OAuthService {
  constructor(private configService: ConfigService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getAccessToken(credentials: ICredentials) {
    let token = null;
    const cachedToken: IToken = await this.cacheManager.get('cached_Token');
    if (this.isTokenValid(cachedToken)) {
      console.log('old');
      token = cachedToken;
    } else {
      console.log('new');
      token = await this.getNewAccessToken(credentials);
      console.log('🚀 ~ file: oauth.service.ts ~ line 25 ~ OAuthService ~ getAccessToken ~ token', token);
      // await this.cacheManager.set('cached_Token', token);
    }

    return token;
  }

  private isTokenValid(token: IToken): boolean {
    return token && this.datenow() <= token.expiresAt - 650;
  }

  private async getNewAccessToken(credentials: ICredentials): Promise<IToken> {
    const url = this.configService.get('netilion.authurl');

    const res = await axios({
      method: 'post',
      url: `${url}/oauth/token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      params: { ...credentials, grant_type: 'password' },
    });

    return this.parseToken(res.data);
  }

  // refreshAccessToken() {}

  private parseToken(data: ITokenResponse): IToken {
    const { access_token, refresh_token, expires_in, created_at, token_type } = data;
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: expires_in + created_at,
      tokenType: token_type,
    };
  }

  private datenow(): number {
    return Math.floor(Date.now() / 1000);
  }
}
