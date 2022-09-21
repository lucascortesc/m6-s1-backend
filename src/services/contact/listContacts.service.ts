import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContactResponse } from "../../interfaces";

export const listContactsService = async (userId: string, clientId: string): Promise<IContactResponse[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: clientId });

  if (!client) {
    throw new AppError("Cliente não encontrado", 404);
  }

  if (client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao cliente", 403);
  }

  const contacts = await contactRepository
    .createQueryBuilder("contact")
    .where("contact.client.id = :clientId", { clientId })
    .getMany();

  const formatedContacts = contacts.map((contact) => {
    return {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };
  });

  return formatedContacts;
};
