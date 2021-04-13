import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  @UseGuards(AuthGuard())
  @Get('profile')
  async protected(@Request() req) {
    return req.user;
  }
}
