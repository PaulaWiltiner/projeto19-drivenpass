import { Router } from "express";
import { signIn,signOut,signUp } from "../controllers/authController";
import { validateSchema } from "../middlewares/schemaValidate";
import { signupSchema } from "../schemas/signUpSchema";
const authRouter = Router();

authRouter.post("/signUp",validateSchema(signupSchema), signUp);
authRouter.post("/signIn",signIn )
authRouter.put("/signOut",signOut)




export default authRouter;