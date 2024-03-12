import { UserDocument } from '../schemas/user.schema';

export class UserDto {
  readonly email: string;
  readonly fullName: string;
  readonly age: number;
  readonly id: string;
  readonly isActivated: boolean;

  constructor(model: UserDocument) {
    this.email = model.email;
    this.fullName = model.fullName;
    this.age = model.age;
    this.id = String(model._id);
    this.isActivated = model.isActivated;
  }
}
