import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {AuthService} from './auth.service';
import config from '../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret
    });
  }
  /**
   * Validates a user by a specified email and password
   * @async
   * @param email
   * @param password
   */
  async validate(payload) {
    const user = await this.authService.validateUserNoJwt(payload.email, payload.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
