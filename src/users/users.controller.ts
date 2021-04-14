import { Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Model } from 'src/models/entities/model.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('current')
  @UseGuards(JwtAuthGuard)
  async getCurrent(@Request() req): Promise<User> {
    return req.user;
  }

  @Patch('finished-setup')
  @UseGuards(JwtAuthGuard)
  async finishedInitialSetup(@Request() req): Promise<User> {
    const { user } = req;
    return this.usersService.finishedInitialSetup(user.id);
  }

  @Get(':id/model')
  async getUserWithModel(@Param('id') id: string): Promise<Model> {
    return this.usersService.getUserWithModel(+id);
  }
}
