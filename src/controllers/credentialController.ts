import { Request, Response } from "express";
import * as credentialService from "../services/credentialService"
import { TCredentials } from "../types/CredentialTypes";


export async function createCredential(req:Request, res:Response) {
  const { url, name, password , title} : TCredentials = req.body;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  await credentialService.createCredential(url, name, password , title,token)

  res.sendStatus(201);
}

export async function getCredentialId(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const {id} =req.params
  const result=await credentialService.getCredentialId(Number(id),token)

  res.send(result).status(200);
}

export async function getCredentials(req:Request, res:Response) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const result=await credentialService.getCredentials(token)
  res.send(result).status(200);
  }

  export async function deleteCredential(req:Request, res:Response) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    const {id} =req.params;
    await credentialService.deleteCredential(Number(id),token)
    return res.sendStatus(200);
    }




