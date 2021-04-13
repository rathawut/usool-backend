import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPasswordService } from '../auth-password.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authPasswordService: AuthPasswordService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authPasswordService.validateUserByPassword(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
