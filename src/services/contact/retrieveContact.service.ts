import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContactResponse } from "../../interfaces";

export const retrieveContactService = async (
  userId: string,
  contactId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id: contactId });

  if (!contact) {
    throw new AppError("Contato não encontrado");
  }

  if (contact.client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao contato");
  }

  const formatedContact = {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    client_id: contact.client.id,
  };

  return formatedContact;
};
