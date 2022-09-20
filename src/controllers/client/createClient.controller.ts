import { Request, Response } from "express";
import { createClientService } from "../../services/client/createClient.service";

export const createClientController = async (req: Request, res: Response): Promise<Response> => {
  const requestData = req.body;
  const user_id = res.locals.user_id;

  const createdClient = await createClientService(requestData, user_id);

  return res.status(201).json(createdClient);
};
