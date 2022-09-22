import cors from "cors";
import express from "express";
import "express-async-errors";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";
import { clientRoutes } from "./routes/client.routes";
import { contactRoutes } from "./routes/contact.routes";
import { sessionRoutes } from "./routes/session.routes";
import { userRoutes } from "./routes/user.routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use("", userRoutes);
app.use("", sessionRoutes);
app.use("/clients", clientRoutes);
app.use("", contactRoutes);

app.use(handleAppErrorMiddleware);

export default app;
