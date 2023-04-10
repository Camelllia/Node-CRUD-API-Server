import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService, // 토큰을 object로 해독하기 위함
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    if (this.isExcludedPath(req.path)) {
      return next();
    }

    if ('auth-token' in req.headers) {
      const token = req.headers['auth-token'];
      try {
        const decoded = this.jwtService.verify(token.toString());
        console.log('decoded Token : {}', decoded);
      } catch {
        throw new UnauthorizedException('유효하지 않거나 만료된 토큰');
      }
    } else {
      throw new UnauthorizedException('인증되지 않은 유저');
    }
    next();
  }

  private isExcludedPath(path: string): boolean {
    return ['/user/create', '/user/login'].some((p) => path.startsWith(p));
  }
}
