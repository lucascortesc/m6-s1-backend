import { Request, Response } from "express";
import { updateContactService } from "../../services/contact/updateContact.services";

export const updateContactController = async (req: Request, res: Response): Promise<Response> => {
  const requestData = req.body;
  const userId = res.locals.userId;
  const { contactId } = req.params;

  const updatedContact = await updateContactService(requestData, userId, contactId);

  return res.json(updatedContact);
};
