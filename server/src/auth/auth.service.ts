import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import * as uuid from 'uuid';
import { UserDto } from './dto/user.dto';
import { TokenService } from './token/token.service';
import { MailService } from './mail/mail.service';

const saltOrRounds = 10;
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  async generateTokensResponse(user: UserDocument) {
    const userDto = new UserDto(user);
    const tokens = this.tokenService.generateToken({ ...userDto });
    await this.tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async registration(email: string, password: string) {
    const candidate = await this.userModel.findOne({ email });
    if (candidate) {
      throw new BadRequestException(
        `Пользователь c email ${email} уже существует`,
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

    return this.generateTokensResponse(user);
  }
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException(`Пользователь с такими данными не найден`);
    }
    const isPassEqual = await bcrypt.compare(password, user.password);

    if (!isPassEqual) {
      throw new BadRequestException(`Некорректный логин или пароль`);
    }
    return this.generateTokensResponse(user);
  }
  async logout(refreshToken: string) {
    return this.tokenService.removeToken(refreshToken);
  }
  async activate(activationLink: string) {
    const user = await this.userModel.findOne({ activationLink });
    if (!user) {
      throw new BadRequestException(`Некорректная ссылка активации`);
    }

    user.isActivated = true;
    await user.save();
  }
  async refresh(refreshToken?: string) {
    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    const userData = this.tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await this.tokenService.findToken(refreshToken);

    if (!userData || tokenFromDB) {
      throw new UnauthorizedException();
    }

    const user = await this.userModel.findOne({
      email: tokenFromDB.user.email,
    });
    return this.generateTokensResponse(user);
  }
  async getProfileInfo(accessToken: string) {
    const token = this.tokenService.validateAccessToken(accessToken);
    const { email, isActivated, id } = await this.userModel.findOne({
      email: token.email,
    });

    return { email, isActivated, id };
  }
}
