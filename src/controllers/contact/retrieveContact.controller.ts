import { Request, Response } from "express";
import { retrieveContactService } from "../../services/contact/retrieveContact.service";

export const retrieveContactController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userId;
  const { contactId } = req.params;

  const contact = await retrieveContactService(userId, contactId);

  return res.json(contact);
};
