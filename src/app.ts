import express from "express";
import { environment } from "./utils/env";

import { appRouter } from "./routes";

const port = environment.port || 3000;

const app = express();

app.use(express.json());

app.use(appRouter);

app.listen(port, () => console.log("app started on", port));
