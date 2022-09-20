import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserLogin } from "../../interfaces";

export const loginService = async ({ email, password }: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ email: email });

  if (!user) {
    throw new AppError("Usuário ou senha inválidos", 403);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Usuário ou senha inválidos", 403);
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

  return token;
};
