import { Request, Response } from "express";
import { deleteContactService } from "../../services/contact/deleteContact.serivce";

export const deleteContactController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userId;
  const { contactId } = req.params;

  await deleteContactService(userId, contactId);

  return res.status(204).json();
};
