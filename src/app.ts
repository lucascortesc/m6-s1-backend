import express from "express";
import "express-async-errors";

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

export default app;