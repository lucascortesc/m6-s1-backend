import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin, IUserLoginResponse, IUserResponse } from "../../interfaces";

export const loginService = async ({ email, password }: IUserLogin): Promise<IUserLoginResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("E-mail ou senha inválidos", 404);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("E-mail ou senha inválidos", 404);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  const loginResponse: IUserResponse = { ...user };

  delete loginResponse.password;

  return {
    ...user,
    token,
  };
};
