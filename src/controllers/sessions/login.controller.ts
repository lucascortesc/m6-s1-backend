import { Request, Response } from "express";
import { loginService } from "../../services/sessions/login.service";

export const loginController = async (req: Request, res: Response) => {
  const requestData = req.body;

  const login = await loginService(requestData);

  const user = {
    id: login.id,
    name: login.name,
    email: login.email,
  };

  return res.json({ user, token: login.token });
};
