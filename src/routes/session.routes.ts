import { Router } from "express";
import { loginController } from "../controllers/sessions/login.controller";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { loginSchema } from "../validation";

export const sessionRoutes = Router();

sessionRoutes.post("/login", schemaValidation(loginSchema), loginController);
