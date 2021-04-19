import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { DatabaseModule } from '../database/database.module';
import { UserManagerAuthGuard } from './user-manager-auth.guard';
import { TwoFAStrategy } from './2fa.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import config from '../config';

@Module({
  imports: [
    PassportModule.register({}),
    DatabaseModule,
    JwtModule.register({
      secret: config.jwtPubKey,
      signOptions: { expiresIn: '1h' }, // TODO discuss
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    TwoFAStrategy,
    UserManagerAuthGuard,
  ],
})
export class AuthModule {}
