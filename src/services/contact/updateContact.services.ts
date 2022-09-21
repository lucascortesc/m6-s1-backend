import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import { IContactRequest, IContactResponse } from "../../interfaces";

export const updateContactService = async (
  data: IContactRequest,
  userId: string,
  contactId: string
): Promise<IContactResponse> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id: contactId });

  if (!contact) {
    throw new AppError("Contato não encontrado", 404);
  }

  if (contact.client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao contato", 403);
  }

  const clientId = contact.client.id;

  if (data.email) {
    const email = data.email;
    const verifyEmailAlreadyExists = await contactRepository
      .createQueryBuilder("contact")
      .where("contact.client.id = :clientId", { clientId })
      .andWhere("contact.email = :email", { email })
      .getOne();

    if (verifyEmailAlreadyExists) {
      throw new AppError("E-mail já cadastrado");
    }
  }

  if (data.phone) {
    const phone = data.phone;
    const verifyPhoneAlreadyExists = await contactRepository
      .createQueryBuilder("contact")
      .where("contact.client.id = :clientId", { clientId })
      .andWhere("contact.phone = :phone", { phone })
      .getOne();

    if (verifyPhoneAlreadyExists) {
      throw new AppError("Telefone já cadastrado");
    }
  }

  await contactRepository.update(contactId, data);

  const updatedContact = await contactRepository.findOneBy({ id: contactId });

  if (!updatedContact) {
    throw new AppError("Contato não encontrado");
  }

  const responseClient = {
    id: updatedContact.id,
    name: updatedContact.name,
    email: updatedContact.email,
    phone: updatedContact.phone,
    client_id: updatedContact.client.id,
  };

  return responseClient;
};
