
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function signUp(email:string,password:string){

  const { rows: isEmail } = await validateEmail(email);

  if (isEmail.length > 0) {
    throw {code:'Conflict' , message:'email is already being used'}
  }

  const hashPassword:string = bcrypt.hashSync(password, 10);
 
  const dataList = {
    email,
    password:hashPassword
  }

 await insertUser(dataList)

}

