export interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface IUserTest {
  name: string;
  email: string;
  password: string;
  token?: string;
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

export interface IUserLoginResponse extends IUserResponse{
  token: string;
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

export interface IClientRequestUpdate {
  name?: string;
  email?: string;
  phone?: string;
}

export interface IClientTest {
  name: string;
  email: string;
  phone: string;
  id?: string;
}

export interface IContactRequest {
  name: string;
  email: string;
  phone: string;
}

export interface IContactResponse extends IContactRequest {
  id: string;
  client_id?: string;
}
