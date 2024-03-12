import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000",
});

type UserBase = { email: string; id: string; isActivated: boolean };
type TokenInfo = {
  refreshToken: string;
  accessToken: string;
};

type AuthResponse = TokenInfo & { user: UserBase };

export class AuthApi {
  static registration() {
    return api.post<AuthResponse>("/registration", {});
  }

  static login() {
    return api.post<AuthResponse>("/login", {});
  }

  static logout() {
    return api.post<{ isSuccess: boolean }>("/logout");
  }

  static activateAccount() {
    return api.get<{ isSuccess: boolean }>("/activate/:link");
  }

  static refresh() {
    return api.get<AuthResponse>("/refresh");
  }

  static resetPasswordRequest() {
    return api.post<{ message: string }>("/reset-password");
  }

  static validatePasswordLink() {
    return api.get<{ isSuccess: boolean }>("/validate-password-link/:link");
  }

  static resetPassword() {
    return api.post<{ isSuccess: boolean }>("/reset-password/:link");
  }

  static getProfileInfo() {
    return api.get<UserBase>("/profile");
  }
}
