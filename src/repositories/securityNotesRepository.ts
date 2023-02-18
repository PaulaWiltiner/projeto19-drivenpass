
import  {client}  from "../config/prisma";
import { TSecurityNotes } from "../types/SecurityNotesTypes";


export async function insertSecurityNote(dataList:TSecurityNotes){
  const result = await client.securityNotes.create({
   data: dataList
  })
  
  return result;
}

export async function findByTitleandUserId(title:string,userId:number){
  const result = await client.securityNotes.findMany({
   where:{
    userId,
    title
   }
  })
  
  return result;
}

export async function findById(id:number){
  const result = await client.securityNotes.findUnique({
   where:{
    id
   }
  })
  
  return result;
}

export async function find(userId:number){
  const result = await client.securityNotes.findMany({
   where:{
    userId
   }
  })
  
  return result;
}

export async function deleteById(id:number){
  await client.securityNotes.delete({
   where:{
    id
   }
  })
  
}