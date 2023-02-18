import { Router } from "express";
import { createSecurityNote, deleteSecurityNote, getSecurityNoteId, getSecurityNotes } from "../controllers/securityNotesController";
import { validateSchema } from "../middlewares/schemaValidate";
import { securityNoteSchema } from "../schemas/securityNoteSchema";
const securityNotesRouter = Router();
import { authenticateToken } from "../middlewares/authentication-middleware";

securityNotesRouter.all("/*", authenticateToken)

securityNotesRouter.post("/securityNotes",validateSchema(securityNoteSchema), createSecurityNote);
securityNotesRouter.get("/securityNotes/:id",getSecurityNoteId)
securityNotesRouter.get("/securityNotes",getSecurityNotes)
securityNotesRouter.delete("/securityNotes/:id",deleteSecurityNote)

export default securityNotesRouter;