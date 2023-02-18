import { Router } from "express";
import { createWifi, deleteWifi, getWifiId, getWifis } from "../controllers/wifisController";
import { validateSchema } from "../middlewares/schemaValidate";
import { wifiSchema } from "../schemas/wifiSchema";
const WifisRouter = Router();
import { authenticateToken } from "../middlewares/authentication-middleware";

WifisRouter.all("/*", authenticateToken)

WifisRouter.post("/Wifis",validateSchema(wifiSchema), createWifi);
WifisRouter.get("/Wifis/:id",getWifiId)
WifisRouter.get("/Wifis",getWifis)
WifisRouter.delete("/Wifis/:id",deleteWifi)

export default WifisRouter;