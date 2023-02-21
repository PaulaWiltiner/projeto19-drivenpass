import { Request, Response } from "express";
import * as authService from "../services/authService"


export async function signUp(req:Request, res:Response) {

  const { email, password } : {email:string, password:string} = req.body;


  await authService.signUp(email,password)

  res.sendStatus(201);
}

export async function signIn(req:Request, res:Response) {
  const { email, password } : {email:string, password:string} = req.body;

  const result=await authService.signIn(email,password)

  res.status(200).send(result);
}


