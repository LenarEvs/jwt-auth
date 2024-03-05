import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('/registration')
  registration() {}

  @Post('/login')
  login() {}

  @Post('/logout')
  logout() {}

  @Get('/activate/:link')
  activate() {}

  @Get('/refresh')
  refresh() {}

  @Get('/users')
  users() {}
}
