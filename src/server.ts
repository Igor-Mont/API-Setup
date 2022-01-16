import "reflect-metadata";
import express from "express";

import { ConnectionDB } from "./database";

ConnectionDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Setup");
});

app.listen(3131, () => console.log("Server is running on port 3131 🔥"));
