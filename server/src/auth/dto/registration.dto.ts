import { IsInt, IsString } from 'class-validator';
export class RegistrationDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  fullName: string;

  @IsInt()
  age: number;
}
