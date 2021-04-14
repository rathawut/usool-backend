import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  AuthStrategy,
  AccessToken,
  User,
  AccessTokenStatus,
  UserStatus,
} from '@prisma/client';

@Injectable()
export class AccessTokenService {
  constructor(private prisma: PrismaService) {}

  async validateUserByToken(token: string): Promise<User | null> {
    const accessToken = await this.findByToken(token);

    if (!accessToken) {
      return null;
    }

    return accessToken.user;
  }

  async findByToken(
    token: string,
  ): Promise<(AccessToken & { user: User }) | null> {
    return this.prisma.accessToken.findFirst({
      where: {
        token,
        status: AccessTokenStatus.ACTIVE,
        user: {
          status: UserStatus.ACTIVE,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async generateToken(
    userId: number,
    authStrategy: AuthStrategy,
  ): Promise<AccessToken | null> {
    return this.prisma.accessToken.create({
      data: {
        userId,
        authStrategy,
        token: uuidv4(),
      },
    });
  }

  async deactivateToken(token: string): Promise<void> {
    await this.prisma.accessToken.update({
      where: {
        token,
      },
      data: {
        status: AccessTokenStatus.INACTIVE,
      },
    });
  }
}
