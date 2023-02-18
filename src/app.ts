
import { loadEnv, connectDb, disconnectDB } from "../src/config";

loadEnv();

import cors from "cors";
import dotenv from "dotenv";
import express, { json, Express } from "express";
import "express-async-errors";
import errorHandler from "./middlewares/errorHandler";
import router from "./routes/index";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandler);



export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
