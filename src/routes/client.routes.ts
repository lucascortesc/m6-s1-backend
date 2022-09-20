import { Router } from "express";
import { createClientController } from "../controllers/client/createClient.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { clientSchema } from "../validation";

export const clientRoutes = Router();

clientRoutes.post("", authorization, schemaValidation(clientSchema), createClientController);
