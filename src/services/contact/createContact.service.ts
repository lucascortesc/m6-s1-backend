import AppDataSource from "../../data-source";
import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContactRequest, IContactResponse } from "../../interfaces";

export const createContactService = async (
  { name, email, phone }: IContactRequest,
  userId: string,
  clientId: string
): Promise<IContactResponse> => {
  const clientRepository = AppDataSource.getRepository(Client);
  const contactRepository = AppDataSource.getRepository(Contact);

  const client = await clientRepository.findOneBy({ id: clientId });

  if (!client) {
    throw new AppError("Cliente não encontrado", 404);
  }

  if (client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao cliente", 403);
  }

  const verifyEmailAlreadyExists = await contactRepository
    .createQueryBuilder("contact")
    .where("contact.client.id = :clientId", { clientId })
    .andWhere("contact.email = :email", { email })
    .getOne();

  if (verifyEmailAlreadyExists) {
    throw new AppError("E-mail já cadastrado");
  }

  const verifyPhoneAlreadyExists = await contactRepository
    .createQueryBuilder("contact")
    .where("contact.client.id = :clientId", { clientId })
    .andWhere("contact.phone = :phone", { phone })
    .getOne();

  if (verifyPhoneAlreadyExists) {
    throw new AppError("Telefone já cadastrado");
  }

  const createdContact = await contactRepository.save({
    name,
    email,
    phone,
    client,
  });

  const responseClient = {
    id: createdContact.id,
    name: createdContact.name,
    email: createdContact.email,
    phone: createdContact.phone,
    client_id: createdContact.client.id,
  };

  return responseClient;
};
