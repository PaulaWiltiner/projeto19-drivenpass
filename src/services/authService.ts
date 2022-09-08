
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail , insertSession, insertUser} from "../repositories/authRepository";

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

  const user = await findByEmail(email);
  

  if (user) {
    throw {code:'NotFound' , message:'user not found'}
  }

  if (bcrypt.compareSync(password, user.password)) {
  
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN
    );

    const dataList = {
      userId: user.id, token
    }
    await insertSession(dataList);
    return dataList
  }

}

export async function signOut(email:string,password:string){

  

}