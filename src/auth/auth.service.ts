import { Injectable } from '@nestjs/common';
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
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<IJWT> {
    const { code } = loginDto;
    const token = await this.oauth2Service.getInitialAccessToken(code);
    const netilionUser = await this.netilionRequestService.getCurrentUser(token);
    const { id, email, finishedInitialSetup } = await this.usersService.getOrCreate(netilionUser, token.refreshToken);
    const rawJWT: IJWTBody = { sub: id, email, finishedInitialSetup };
    return {
      accessToken: await this.jwtService.signAsync(rawJWT)
    };
  }
}
