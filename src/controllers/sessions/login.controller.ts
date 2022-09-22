import { Request, Response } from "express";
import { loginService } from "../../services/sessions/login.service";

export const loginController = async (req: Request, res: Response) => {
  const requestData = req.body;

  const token = await loginService(requestData);

  return res.json({ token });
};
