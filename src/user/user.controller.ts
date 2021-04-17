import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('profile')
  async protected(@Request() req) {
    return req.user;
  }
}
