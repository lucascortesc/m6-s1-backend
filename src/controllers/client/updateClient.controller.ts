import { Request, Response } from "express";
import { updateClientService } from "../../services/client/updateClient.service";

export const updateClientController = async (req: Request, res: Response): Promise<Response> => {
  const requestData = req.body;
  const userId = res.locals.userId;
  const { clientId } = req.params;

  const updatedClient = await updateClientService(requestData, userId, clientId);

  return res.json(updatedClient);
};
