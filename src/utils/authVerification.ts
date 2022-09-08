
import { findSession } from "../repositories/authRepository";

export async function authenticateToken(token:string){

  const session = await findSession(token);
 
  if (!session) {
    throw {code:'NotFound' , message:'session not found'}
  }

  return session.userId 

}