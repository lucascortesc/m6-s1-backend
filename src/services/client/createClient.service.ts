import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IClientRequest, IClientResponse } from "../../interfaces";

export const createClientService = async (
  { name, email, phone }: IClientRequest,
  user_id: string
): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: user_id });

  if (!user) {
    throw new AppError("Usuário não encontrado");
  }

  const verifyEmailAlreadyExists = await clientRepository.findOneBy({ email });

  if (verifyEmailAlreadyExists) {
    throw new AppError("E-mail já cadastrado");
  }

  const createdClient = await clientRepository.save({
    name,
    email,
    phone,
    user,
  });

  const responseClient = {
    id: createdClient.id,
    name: createdClient.name,
    email: createdClient.email,
    phone: createdClient.phone,
    created_at: createdClient.created_at,
    user_id: createdClient.user.id,
  };

  return responseClient;
};
