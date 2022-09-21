import * as bcrypt from "bcryptjs";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces";

export const createUserService = async ({ name, email, password }: IUserRequest): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const verifyEmailAlreadyExists = await userRepository.findOneBy({ email: email });

  if (verifyEmailAlreadyExists) {
    throw new AppError("E-mail já cadastrado");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const createdUser = await userRepository.save({
    name,
    email,
    password: hashedPassword,
  });

  const responseUser: IUserResponse = { ...createdUser };

  delete responseUser.password;

  return responseUser;
};
