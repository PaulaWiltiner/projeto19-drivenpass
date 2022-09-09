import { Router } from "express";
import authRouter from "./authRouter";
import cardsRouter from "./cardsRouter";
import credentialsRouter from "./credentialsRouter";
import securityNotesRouter from "./securityNotesRoutes";
import WifisRouter from "./wifisRouter";

const router = Router();
router.use(authRouter);
router.use(credentialsRouter);
router.use(securityNotesRouter);
router.use(WifisRouter);
router.use(cardsRouter);

export default router;