
import { authenticateToken } from "../utils/authVerification";
import { deleteById, find, findById, findByTitleandUserId, insertSecurityNote } from "../repositories/securityNotesRepository";

export async function createSecurityNote(title:string,text:string,token:string){
  const userId=await authenticateToken(token);
  const findOne=await findByTitleandUserId(title,userId);
 
  if (findOne.length!==0) {
    throw {code:'Conflict' , message:'title already existis'}
  }

  const dataList={
    userId,
    title,
    text
  }
  await  insertSecurityNote(dataList)
 
 }

 export async function getSecurityNoteId(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);

  if(!result){
    throw {code:'NotFound' , message:'SecurityNotes not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
      

  return result
 }

 export async function getSecurityNotes(token:string){
  const userId=await authenticateToken(token);
  const result = await find(userId);
  return result
 }

 export async function deleteSecurityNote(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);
  if(!result){
    throw {code:'NotFound' , message:'SecurityNotes not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  await deleteById(id);
 }