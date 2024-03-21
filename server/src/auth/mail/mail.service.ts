import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
@Injectable()
export class MailService {
  private readonly transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your.email@gmail.com',
        pass: 'yourpassword',
      },
    });
  }
  async sendActivationMail(email: string, activationLink: string) {
    await this.transporter.sendMail({
      from: 'your.email@gmail.com',
      to: email,
      subject: 'Активация аккаунта',
      html: `<div><a href="http://127.0.0.1:5173/activate/${activationLink}" target="_blank">Активировать аккаунт</a></div>`,
    });
  }
  async sendResetPasswordMail(email: string, resetLink: string) {
    await this.transporter.sendMail({
      from: 'your.email@gmail.com',
      to: email,
      subject: 'Восстановление пароля',
      html: `<div><a href="http://127.0.0.1:5173/reset-password/${resetLink}" target="_blank">Задать новый пароль</a></div>`,
    });
  }
}
