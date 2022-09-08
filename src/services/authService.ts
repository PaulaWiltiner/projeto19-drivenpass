
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail , insertUser} from "../repositories/authRepository";

export async function signUp(email:string,password:string){

  const isEmail = await findByEmail(email);
  console.log(isEmail)

  if (isEmail) {
    throw {code:'Conflict' , message:'email is already being used'}
  }

  const hashPassword:string = bcrypt.hashSync(password, 10);
 
  const dataList = {
    email,
    password:hashPassword
  }

 await insertUser(dataList)

}

export async function signIn(email:string,password:string){

  

}

export async function signOut(email:string,password:string){

  

}