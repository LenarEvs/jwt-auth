import {
  Controller,
  ValidationPipe,
  Get,
  Post,
  Body,
  Res,
  Param,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { RegistrationDto } from './dto/registration.dto';

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/registration')
  async registration(
    @Body(new ValidationPipe({ transform: true }))
    body: RegistrationDto,
    @Res() response: Response,
  ) {
    const userData = await this.authService.registration(
      body.email,
      body.password,
    );
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: ONE_MONTH,
      httpOnly: true,
    });

    response.json(userData);
  }

  @Post('/login')
  async login(
    @Body(new ValidationPipe({ transform: true }))
    body: RegistrationDto,
    @Res() response: Response,
  ) {
    const userData = await this.authService.login(body.email, body.password);
    response.cookie('refreshToken', userData.refreshToken, {
      maxAge: ONE_MONTH,
      httpOnly: true,
    });

    response.json(userData);
  }

  @Post('/logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies['refreshToken'];

    await this.authService.logout(refreshToken);
    response.clearCookie('refreshToken');

    response.json({ isSuccess: true });
  }

  @Get('/activate/:link')
  activate(@Param('link') link: string) {
    return this.authService.activate(link);
  }

  @Get('/refresh')
  async refresh(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies['refreshToken'];
    const nextTokens = await this.authService.refresh(refreshToken);
    response.cookie('refreshToken', nextTokens, {
      maxAge: ONE_MONTH,
      httpOnly: true,
    });
    response.json(nextTokens);
  }

  @Get('/profile')
  async getProfileInfo(@Req() request: Request) {
    const accessToken = request.headers.authorization.split(' ')[1];
    return await this.authService.getProfileInfo(accessToken);
  }
}
