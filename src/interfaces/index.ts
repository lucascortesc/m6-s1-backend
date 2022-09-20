export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}
