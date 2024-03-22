import express from "express";
import { environment } from "./utils/env";

const port = environment.port || 3000;

const app = express();

app.use(express.json());

app.listen(port, () => console.log("app started on", port));
