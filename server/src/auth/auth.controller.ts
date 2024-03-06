import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/registration')
  async registration(
    @Body() body: { email: string; password: string },
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

    return userData;
  }

  @Post('/login')
  login() {
    return this.authService.login();
  }

  @Post('/logout')
  logout() {
    return this.authService.logout();
  }

  @Get('/activate/:link')
  activate() {
    return this.authService.activate();
  }

  @Get('/refresh')
  refresh() {
    return this.authService.refresh();
  }

  @Get('/users')
  users() {
    return this.authService.getUsers();
  }
}
