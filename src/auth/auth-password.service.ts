import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { AuthPassword, User, UserStatus } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AuthPasswordService {
  constructor(private prisma: PrismaService) {}

  async validateUserByPassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const authPassword = await this.findByUsername(username);

    if (!authPassword) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      authPassword.password,
    );

    if (!isPasswordCorrect) {
      return null;
    }

    return authPassword.user;
  }

  async findByUsername(
    username: string,
  ): Promise<(AuthPassword & { user: User }) | null> {
    return this.prisma.authPassword.findFirst({
      where: {
        username,
        user: {
          status: UserStatus.ACTIVE,
        },
      },
      include: {
        user: true,
      },
    });
  }
}
