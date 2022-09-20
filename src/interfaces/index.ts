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

export interface IClientRequest {
  name: string;
  email: string;
  phone: string;
}

export interface IClientResponse extends IClientRequest {
  id: string;
  user_id: string;
  created_at: Date;
}
