import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './schemas/user.schema';
import { Token } from './schemas/token.schema';
import * as uuid from 'uuid';
import { UserDto } from './dto/user.dto';
import { TokenService } from './token/token.service';
import { MailService } from './mail/mail.service';

const saltOrRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  async registration(email: string, password: string) {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new HttpException(
        `Пользователь c email ${email} уже существует`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, saltOrRounds);
    const activationLink = uuid.v4();
    const user = await this.userModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await this.mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  login() {
    return { hello: '' };
  }
  logout() {
    return { hello: '' };
  }
  activate() {
    return { hello: '' };
  }
  refresh() {
    return { hello: '' };
  }
  getUsers() {
    return ['user1', 'user2'];
  }
}
