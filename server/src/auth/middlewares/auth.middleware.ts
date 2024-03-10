import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const userData = this.tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new UnauthorizedException();
    }

    next();
  }
}
