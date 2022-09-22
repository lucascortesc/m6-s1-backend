import { Router } from "express";
import { createUserController } from "../controllers/user/createUser.controller";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { userSchema } from "../validation";

export const userRoutes = Router();

userRoutes.post("/register", schemaValidation(userSchema), createUserController);
