import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { CookieSerializer } from './cookie-serializer';
import { DatabaseModule } from '../database/database.module';
import {UserAuthGuard} from './admin.auth.guard';
import { TwoFAStrategy } from './2fa.strategy';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import config from '../config';

@Module({
  imports: [
    PassportModule.register({}),
    DatabaseModule,
    JwtModule.register({
      secret: config.jwtSecret,
      // TODO: how long?
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    TwoFAStrategy,
    UserAuthGuard,
    CookieSerializer,
  ],
})
export class AuthModule {}
