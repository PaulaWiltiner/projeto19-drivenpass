import { Router } from "express";
import { createCards, deleteCard, getCardId, getCards } from "../controllers/cardsController";
import { validateSchema } from "../middlewares/schemaValidate";
import { cardsSchema } from "../schemas/cardsSchema";
const cardsRouter = Router();

cardsRouter.post("/credentials",validateSchema(cardsSchema), createCards);
cardsRouter.get("/cards/:id",getCardId)
cardsRouter.get("/cards",getCards)
cardsRouter.delete("/cards/:id",deleteCard)

export default cardsRouter;