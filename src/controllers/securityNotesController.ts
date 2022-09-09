import { Request, Response } from "express";
import * as securityNotesService from "../services/securityNotesService"
import { TSecurityNotes } from "../types/SecurityNotesTypes";


export async function createSecurityNote(req:Request, res:Response) {
  const { title,text} : TSecurityNotes = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  await securityNotesService.createSecurityNote(title, text, token)

  res.sendStatus(201);
}

export async function getSecurityNoteId(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const {id} =req.params
  const result=await securityNotesService.getSecurityNoteId(Number(id),token)

  res.send(result).status(200);
}

export async function getSecurityNotes(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const result=await securityNotesService.getSecurityNotes(token)
  res.send(result).status(200);
  }

  export async function deleteSecurityNote(req:Request, res:Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const {id} =req.params;
    await securityNotesService.deleteSecurityNote(Number(id),token)
    return res.sendStatus(200);
    }




