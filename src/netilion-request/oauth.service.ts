import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Cache } from 'cache-manager';
import { User } from 'src/users/entities/user.entity';
import ITokenResponse from './interfaces/token-response.interface';
import IToken from './interfaces/token.interface';

@Injectable()
export class OAuthService {
  constructor(private configService: ConfigService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getInitialAccessToken(code: string): Promise<IToken> {
    const { authurl, redirectURI, clientId, clientSecret } = this.configService.get('netilion');
    let res;
    try {
      res = await axios({
        method: 'post',
        url: `${authurl}/oauth/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectURI
        }
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    return this.parseToken(res.data);
  }

  async getAccessToken(user: User) {
    const { id, refreshToken } = user;
    let token = null;
    const cachedToken: IToken = await this.cacheManager.get(`cached_Token_${id}`);
    if (this.isTokenValid(cachedToken)) {
      token = cachedToken;
    } else {
      token = await this.refreshAccessToken(refreshToken);
      await this.cacheManager.set(`cached_Token_${id}`, token);
    }

    return token;
  }

  private isTokenValid(token: IToken): boolean {
    return token && this.datenow() <= token.expiresAt - 650;
  }

  private async refreshAccessToken(refreshToken: string) {
    const { authurl, clientId, clientSecret } = this.configService.get('netilion');
    let res;
    try {
      res = await axios({
        method: 'post',
        url: `${authurl}/oauth/token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    return this.parseToken(res.data);
  }

  private parseToken(data: ITokenResponse): IToken {
    const { access_token, refresh_token, expires_in, created_at, token_type } = data;
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiresAt: expires_in + created_at,
      tokenType: token_type
    };
  }

  private datenow(): number {
    return Math.floor(Date.now() / 1000);
  }
}
