import { Request, Response } from "express";
import { listClientsService } from "../../services/client/listClients.service";

export const listClientsController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userId;

  const clients = await listClientsService(userId);

  return res.json(clients);
};
