import { Injectable } from '@nestjs/common';
import { AuthStrategy, User } from '@prisma/client';
import { AccessTokenService } from './access-token.service';

@Injectable()
export class AuthService {
  constructor(private accessTokenService: AccessTokenService) {}

  async login(user: User, authStrategy: AuthStrategy) {
    const { token: accessToken } = await this.accessTokenService.generateToken(
      user.id,
      authStrategy,
    );

    return { accessToken };
  }
}
