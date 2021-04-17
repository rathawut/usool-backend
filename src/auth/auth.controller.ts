import { Controller, UseGuards, Post, Request, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthPasswordDto } from './dto/auth-password.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: AuthPasswordDto })
  async login(@Request() req) {
    return this.authService.login(req.user, 'PASSWORD');
  }

  @UseGuards(AuthGuard())
  @Post('logout')
  @ApiBearerAuth()
  @HttpCode(204)
  async logout(@Request() req) {
    const token = req.headers.authorization.substring(7);
    this.authService.logout(token);
  }
}
