import { Request, Response } from "express";
import { retrieveClientsService } from "../../services/client/retrieveClient.service";

export const retrieveClientController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userId;
  const { clientId } = req.params;

  const client = await retrieveClientsService(clientId, userId);

  return res.json(client);
};
