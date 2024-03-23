import { Router } from "express";

const userRouter = Router();

userRouter.get("/foo", (_, res) => {
  return res.json({ bar: "joo" });
});

export { userRouter };
