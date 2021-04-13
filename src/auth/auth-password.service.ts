import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { AuthPassword, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthPasswordService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

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

    const user = this.userService.findOne(authPassword.userId);

    return user;
  }

  async findByUsername(username: string): Promise<AuthPassword | null> {
    return this.prisma.authPassword.findUnique({
      where: {
        username,
      },
    });
  }
}
