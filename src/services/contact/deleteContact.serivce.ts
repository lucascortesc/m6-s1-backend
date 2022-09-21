import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";

export const deleteContactService = async (userId: string, contactId: string) => {
  const contactRepository = AppDataSource.getTreeRepository(Contact);

  const contact = await contactRepository.findOneBy({ id: contactId });

  if (!contact) {
    throw new AppError("Contato não encontrado", 404);
  }

  if (contact.client.user.id !== userId) {
    throw new AppError("Você não possui acesso ao contato", 403);
  }

  await contactRepository.delete(contactId);
};
