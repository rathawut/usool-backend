import { Controller, UseGuards, Post, Request, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user, 'PASSWORD');
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  @HttpCode(204)
  async logout(@Request() req) {
    const token = req.headers.authorization.substring(7);
    this.authService.logout(token);
  }
}
