import "reflect-metadata";
import "dotenv";
import "express-async-errors";
import express from "express";

import "@shared/container";

import { asyncErrors } from "@shared/infra/http/middlewares/asyncErrors";
import { ConnectionDB } from "@shared/infra/typeorm";
import { router } from "@shared/infra/http/routes";

ConnectionDB();

const app = express();

app.use(express.json());

app.use(router);

app.use(asyncErrors);

export { app };
