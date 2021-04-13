import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import { BearerStrategy } from './strategies/bearer.strategy';
import { AuthService } from './auth.service';
import { AuthPasswordService } from './auth-password.service';
import { AccessTokenService } from './access-token.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'bearer',
    }),
    forwardRef(() => UserModule),
  ],
  providers: [
    PrismaService,
    LocalStrategy,
    BearerStrategy,
    AuthService,
    AuthPasswordService,
    AccessTokenService,
  ],
  controllers: [AuthController],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
