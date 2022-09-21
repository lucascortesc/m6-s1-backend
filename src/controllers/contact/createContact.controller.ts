import { Request, Response } from "express";
import { createContactService } from "../../services/contact/createContact.service";

export const createContactController = async (req: Request, res: Response): Promise<Response> => {
  const requestData = req.body;
  const userId = res.locals.userId;
  const { clientId } = req.params;

  const createdContact = await createContactService(requestData, userId, clientId);

  return res.status(201).json(createdContact);
};
