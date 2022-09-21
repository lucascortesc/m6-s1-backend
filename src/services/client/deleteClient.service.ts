import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { AppError } from "../../errors/AppError";

export const deleteClientService = async (clientId: string, userId: string) => {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: clientId });

  if (!client) {
    throw new AppError("Cliente não encontrado");
  }

  if (client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao cliente");
  }

  clientRepository.delete(clientId);
};
