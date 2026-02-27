export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expireAt: Date;
  message: string;
}
