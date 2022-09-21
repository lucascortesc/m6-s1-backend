import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/AppError";
import { IClientResponse } from "../../interfaces";

export const retrieveClientsService = async (clientId: string, userId: string): Promise<IClientResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: clientId });

  if (!client) {
    throw new AppError("Cliente não encontrado");
  }

  if (client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao cliente");
  }

  const formatedClient = {
    id: client.id,
    name: client.name,
    email: client.email,
    phone: client.phone,
    user_id: client.user.id,
    created_at: client.created_at,
  };

  return formatedClient;
};
