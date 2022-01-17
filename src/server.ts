import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { ConnectionDB } from "./database";
import "@shared/container";

import { routes } from "./routes";
import { asyncErrors } from "@shared/middlewares/asyncErrors";

ConnectionDB();

const app = express();

app.use(express.json());

app.use(routes);

app.use(asyncErrors);

app.listen(3131, () => console.log("Server is running on port 3131 🔥"));
