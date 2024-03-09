import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token } from '../schemas/token.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) {}
}
