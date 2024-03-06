import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './schemas/user.schema';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenService } from './token/token.service';
import { MailService } from './mail/mail.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
  ],
  providers: [AuthService, TokenService, MailService],
  controllers: [AuthController],
})
export class AuthModule {}
