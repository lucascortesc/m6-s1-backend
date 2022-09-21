import { Router } from "express";
import { createContactController } from "../controllers/contact/createContact.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { clientSchema } from "../validation";

export const contactRoutes = Router();

contactRoutes.post(
  "/clients/:clientId/contacts",
  authorization,
  schemaValidation(clientSchema),
  createContactController
);
