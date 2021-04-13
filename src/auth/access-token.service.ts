import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AuthStrategy, AccessToken, User } from '@prisma/client';
import { UserService } from '../user/user.service';

@Injectable()
export class AccessTokenService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async validateUserByToken(token: string): Promise<User | null> {
    const accessToken = await this.prisma.accessToken.findUnique({
      where: { token },
    });

    if (!accessToken) {
      return null;
    }

    const user = this.userService.findOne(accessToken.userId);

    return user;
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

  async deactivateToken(token: string): Promise<boolean> {
    this.prisma.accessToken.update({
      where: {
        token,
      },
      data: {
        status: 'INACTIVE',
      },
    });

    return true;
  }
}
