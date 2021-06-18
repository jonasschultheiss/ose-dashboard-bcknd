import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dto/login.dto';
import { IJWT } from './auth/interfaces/jwt.interface';

@Controller('auth')
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body(ValidationPipe) loginDto: LoginDto): Promise<IJWT> {
    return this.authService.login(loginDto);
  }
}
