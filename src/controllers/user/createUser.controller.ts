import { Request, Response } from "express";
import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response): Promise<Response> => {
  const requestData = req.body;

  const createdUser = await createUserService(requestData);

  return res.status(201).json(createdUser);
};
