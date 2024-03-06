import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../schemas/token.schema';
const JWT_ACCESS_SECRET = 'jwt-access';
const JWT_REFRESH_SECRET = 'jwt-refresh';

@Injectable()
export class TokenService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}
  generateToken(payload: UserDto) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    });
    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await this.tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await this.tokenModel.create({ user: userId, refreshToken });
  }
}
