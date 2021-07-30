import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NetilionRequestService } from 'src/netilion-request/netilion-request.service';
import { OAuthService } from 'src/netilion-request/oauth.service';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { IJWTBody } from './interfaces/jwt-body.interface';
import { IJWT } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    private oauth2Service: OAuthService,
    private netilionRequestService: NetilionRequestService,
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async login(loginDto: LoginDto): Promise<IJWT> {
    const permittedUserGroupId = this.configService.get('permittedUserGroupId');
    const { code } = loginDto;
    const token = await this.oauth2Service.getInitialAccessToken(code);
    console.log('🚀 ~ file: auth.service.ts ~ line 25 ~ AuthService ~ login ~ token', token);
    const netilionUser = await this.netilionRequestService.getCurrentUser(token);
    const { usergroups } = await this.netilionRequestService.getCurrentUsersGroup(token);
    if (usergroups.length < 1 || usergroups[0].id !== permittedUserGroupId) {
      throw new UnauthorizedException('Not permitted to log into this client application');
    }

    const { id, email, finishedInitialSetup } = await this.usersService.getOrCreate(netilionUser, token.refreshToken);
    const rawJWT: IJWTBody = { sub: id, email, finishedInitialSetup };
    return {
      accessToken: await this.jwtService.signAsync(rawJWT)
    };
  }
}
