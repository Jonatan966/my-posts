import express from "express";
import { environment } from "./utils/env";
import { userRouter } from "./modules/user/routes";

import { appErrorHandler } from "./middlewares/app-error-handler";

const port = environment.port || 3000;

const app = express();

app.use(express.json());

app.use(userRouter);

app.use(appErrorHandler);

app.listen(port, () => console.log("app started on", port));
