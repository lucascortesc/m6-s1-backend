import { Request, Response } from "express";
import { listContactsService } from "../../services/contact/listContacts.service";

export const listContactsController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userId;
  const { clientId } = req.params;

  const contacts = await listContactsService(userId, clientId);

  return res.json(contacts);
};
