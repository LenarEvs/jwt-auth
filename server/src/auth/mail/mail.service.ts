import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
@Injectable()
export class MailService {
  private readonly transporter: Transporter;
  constructor() {
    // this.transporter = nodemailer.createTransport({
    //   // Настройте транспорт здесь (например, SMTP, SendGrid, Gmail и т. д.)
    //   // Пример настройки для Gmail:
    //   service: 'gmail',
    //   auth: {
    //     user: 'your.email@gmail.com',
    //     pass: 'yourpassword',
    //   },
    // });
  }
  async sendActivationMail(email: string, activationLink: string) {
    console.log(email, activationLink);
    // await this.transporter.sendMail({
    //   from: '',
    //   to: email,
    //   subject: 'Активация аккаунта',
    //   html: `<div>${activationLink}</div>`,
    // });
  }
}
