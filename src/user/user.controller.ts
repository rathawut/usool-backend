import { Controller, UseGuards, Get, Request } from '@nestjs/common';
import { BearerAuthGuard } from '../auth/guards/bearer-auth.guard';

@Controller('user')
export class UserController {
  @UseGuards(BearerAuthGuard)
  @Get('profile')
  async protected(@Request() req) {
    return req.user;
  }
}
