import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { PrismaService } from '../prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import { BearerStrategy } from './strategies/bearer.strategy';
import { AuthService } from './auth.service';
import { AuthPasswordService } from './auth-password.service';
import { AccessTokenService } from './access-token.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule.register({
          defaultStrategy: 'bearer',
        }),
        UserModule,
      ],
      providers: [
        PrismaService,
        LocalStrategy,
        BearerStrategy,
        AuthService,
        AuthPasswordService,
        AccessTokenService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
