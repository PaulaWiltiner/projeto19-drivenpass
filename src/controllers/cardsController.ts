import { Request, Response } from "express";
import * as cardsService from "../services/cardsService"
import { TCards } from "../types/CardsTypes";


export async function createCards(req:Request, res:Response) {
  const data : TCards = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  await cardsService.createCards(data,token)

  res.sendStatus(201);
}

export async function getCardId(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const {id} =req.params
  const result=await cardsService.getCardId(Number(id),token)

  res.send(result).status(200);
}

export async function getCards(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const result=await cardsService.getCards(token)
  res.send(result).status(200);
  }

  export async function deleteCard(req:Request, res:Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const {id} =req.params;
    await cardsService.deleteCard(Number(id),token)
    return res.sendStatus(200);
    }


