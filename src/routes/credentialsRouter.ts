import { Router } from "express";
import { createCredential, deleteCredential, getCredentialId, getCredentials } from "../controllers/credentialController";
import { validateSchema } from "../middlewares/schemaValidate";
import { credentialSchema } from "../schemas/credentialSchema";
const credentialsRouter = Router();
import { authenticateToken } from "../middlewares/authentication-middleware";

credentialsRouter.all("/*", authenticateToken)

credentialsRouter.post("/credentials",validateSchema(credentialSchema), createCredential);
credentialsRouter.get("/credentials/:id",getCredentialId)
credentialsRouter.get("/credentials",getCredentials)
credentialsRouter.delete("/credentials/:id",deleteCredential)

export default credentialsRouter;