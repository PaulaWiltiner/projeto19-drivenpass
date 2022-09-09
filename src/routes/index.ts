import { Router } from "express";
import authRouter from "./authRouter";
import credentialsRouter from "./credentialsRouter";
import securityNotesRouter from "./securityNotesRoutes";

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(securityNotesRouter);

export default router;