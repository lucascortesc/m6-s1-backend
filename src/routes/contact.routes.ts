import { Router } from "express";
import { createContactController } from "../controllers/contact/createContact.controller";
import { deleteContactController } from "../controllers/contact/deleteContact.controller";
import { listContactsController } from "../controllers/contact/listContacts.controller";
import { retrieveContactController } from "../controllers/contact/retrieveContact.controller";
import { updateContactController } from "../controllers/contact/updateContact.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { clientSchema, updateClientSchema } from "../validation";

export const contactRoutes = Router();

contactRoutes.post(
  "/clients/:clientId/contacts",
  authorization,
  schemaValidation(clientSchema),
  createContactController
);
contactRoutes.patch(
  "/contacts/:contactId",
  authorization,
  schemaValidation(updateClientSchema),
  updateContactController
);

contactRoutes.get("/clients/:clientId/contacts", authorization, listContactsController);
contactRoutes.get("/contacts/:contactId", authorization, retrieveContactController);
contactRoutes.delete("/contacts/:contactId", authorization, deleteContactController);
