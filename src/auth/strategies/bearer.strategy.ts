import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AccessTokenService } from '../access-token.service';

@Injectable()
export class BearerStrategy extends PassportStrategy(Strategy) {
  constructor(private accessTokenService: AccessTokenService) {
    super();
  }

  async validate(token: string): Promise<any> {
    const user = await this.accessTokenService.validateUserByToken(token);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
