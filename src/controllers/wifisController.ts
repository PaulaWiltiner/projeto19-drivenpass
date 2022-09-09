import { Request, Response } from "express";
import * as wifiService from "../services/wifiService"
import { TWifis} from "../types/WifisTypes";


export async function createWifi(req:Request, res:Response) {
  const { name, password } : TWifis = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  await wifiService.createWifi(name, password ,token)

  res.sendStatus(201);
}

export async function getWifiId(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const {id} =req.params
  const result=await wifiService.getWifiId(Number(id),token)

  res.send(result).status(200);
}

export async function getWifis(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const result=await wifiService.getWifis(token)
  res.send(result).status(200);
  }

  export async function deleteWifi(req:Request, res:Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const {id} =req.params;
    await wifiService.deleteWifi(Number(id),token)
    return res.sendStatus(200);
    }




