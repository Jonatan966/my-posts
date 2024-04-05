import { Router } from "express";
import { userRouter } from "./modules/user/routes";
import { postRouter } from "./modules/post/routes";

const appRouter = Router();

appRouter.use("/users", userRouter);
appRouter.use("/posts", postRouter);

export { appRouter };
