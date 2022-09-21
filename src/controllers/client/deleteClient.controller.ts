import { Request, Response } from "express";
import { deleteClientService } from "../../services/client/deleteClient.service";

export const deleteClientController = async (req: Request, res: Response): Promise<Response> => {
  const userId = res.locals.userId;
  const { clientId } = req.params;

  await deleteClientService(clientId, userId);

  return res.status(204).json();
};
