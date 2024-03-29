import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";
import WifisRouter from "./wifisRouter";

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(WifisRouter);

export default router;