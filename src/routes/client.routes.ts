import { Router } from "express";
import { createClientController } from "../controllers/client/createClient.controller";
import { deleteClientController } from "../controllers/client/deleteClient.controller";
import { listClientsController } from "../controllers/client/listClients.controller";
import { retrieveClientController } from "../controllers/client/retrieveClient.controller";
import { updateClientController } from "../controllers/client/updateClient.controller";
import { authorization } from "../middlewares/authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { clientSchema, updateClientSchema } from "../validation";

export const clientRoutes = Router();

clientRoutes.get("", authorization, listClientsController);
clientRoutes.get("/:clientId", authorization, retrieveClientController);
clientRoutes.post("", authorization, schemaValidation(clientSchema), createClientController);
clientRoutes.patch("/:clientId", authorization, schemaValidation(updateClientSchema), updateClientController);
clientRoutes.delete("/:clientId", authorization, deleteClientController);
