
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findByEmail , insertSession, insertUser} from "../repositories/authRepository";

export async function signUp(email:string,password:string){

  const isEmail = await findByEmail(email);
  
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
  
  if (!user) {
    throw {code:'Unathorized' , message:'Unathorized'}
  }

  if (bcrypt.compareSync(password, user.password)) {
  
    const token:string = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET
    );

    const dataList = {
      token,userId: user.id
    }
    
    await insertSession(dataList);
    return dataList
  }else{
    throw {code:'Unathorized' , message:'Unathorized'}
  }

}

