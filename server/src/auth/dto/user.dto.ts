import { UserDocument } from '../schemas/user.schema';

export class UserDto {
  readonly email: string;
  readonly id: string;
  readonly isActivated: boolean;

  constructor(model: UserDocument) {
    this.email = model.email;
    this.id = String(model._id);
    this.isActivated = model.isActivated;
  }
}
