import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";
import { IClientResponse } from "../../interfaces";

export const listClientsService = async (userId: string): Promise<IClientResponse[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const clientRepository = AppDataSource.getRepository(Client);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError("Usuário não encontrado", 404);
  }

  const clients = await clientRepository.find({
    where: {
      user: user,
    },
  });

  const formatedClients = clients.map((client) => {
    return {
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      user_id: client.user.id,
      created_at: client.created_at,
    };
  });

  return formatedClients;
};
