import axios from "axios";

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/auth",
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

type UserBase = {
  email: string;
  id: string;
  isActivated: boolean;
  age: number;
  fullName: string;
};
type TokenInfo = {
  refreshToken: string;
  accessToken: string;
};

type AuthResponse = TokenInfo & { user: UserBase };

export type BaseLoginPayload = {
  email: string;
  password: string;
};
export type RegistrationPayload = BaseLoginPayload & {
  fullName: string;
  age?: number;
};

export class AuthApi {
  static registration(data: RegistrationPayload) {
    return api.post<AuthResponse>("/registration", data);
  }

  static login(data: BaseLoginPayload) {
    return api.post<AuthResponse>("/login", data);
  }

  static logout() {
    return api.post<{ isSuccess: boolean }>("/logout");
  }

  static activateAccount(activateLink: string) {
    return api.get<{ isSuccess: boolean }>(`/activate/${activateLink}`);
  }

  static refresh() {
    return api.get<AuthResponse>("/refresh");
  }

  static resetPasswordRequest(email: string) {
    return api.post<{ message: string }>("/reset-password", { email });
  }

  static validatePasswordLink(passwordLink: string) {
    return api.get<{ isSuccess: boolean }>(
      `/validate-password-link/${passwordLink}`,
    );
  }

  static resetPassword({
    passwordLink,
    password,
  }: {
    passwordLink: string;
    password: string;
  }) {
    return api.post<{ isSuccess: boolean }>(`/reset-password/${passwordLink}`, {
      password,
    });
  }

  static getProfileInfo() {
    return api.get<UserBase>("/profile");
  }
}
