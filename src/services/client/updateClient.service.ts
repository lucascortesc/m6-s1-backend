import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IClientRequestUpdate, IClientResponse } from "../../interfaces";

export const updateClientService = async (
  data: IClientRequestUpdate,
  user_id: string,
  client_id: string
): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: user_id });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const client = await clientRepository.findOneBy({ id: client_id });

  if (!client) {
    throw new AppError("Cliente não encontrado", 404);
  }

  if (client.user.id !== user_id) {
    throw new AppError("Você não possui acesso ao cliente", 403);
  }

  if (data.email) {
    const verifyEmailAlreadyExists = await clientRepository.findOne({
      where: [{ user, email: data.email }],
    });

    if (verifyEmailAlreadyExists) {
      if (verifyEmailAlreadyExists.id !== client_id) {
        throw new AppError("E-mail já cadastrado");
      }
    }
  }

  if (data.phone) {
    const verifyPhoneAlreadyExists = await clientRepository.findOne({
      where: [{ user, phone: data.phone }],
    });

    if (verifyPhoneAlreadyExists) {
      if (verifyPhoneAlreadyExists.id !== client_id) {
        throw new AppError("Telefone já cadastrado");
      }
    }
  }

  await clientRepository.update(client_id, data);

  const updatedClient = await clientRepository.findOneBy({ id: client_id });

  if (!updatedClient) {
    throw new AppError("Cliente não encontrado");
  }

  const responseClient = {
    id: updatedClient.id,
    name: updatedClient.name,
    email: updatedClient.email,
    phone: updatedClient.phone,
    created_at: updatedClient.created_at,
    user_id: updatedClient.user.id,
  };

  return responseClient;
};
