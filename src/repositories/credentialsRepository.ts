
import  {client } from "../config/prisma";
import { TCredentials } from "../types/CredentialTypes";


export async function insertCredential(dataList:TCredentials){
  const result = await client.credentials.create({
   data: dataList
  })
  
  return result;
}

export async function findByTitleandUserId(title:string,userId:number){
  const result = await client.credentials.findMany({
   where:{
    userId,
    title
   }
  })
  
  return result;
}

export async function findById(id:number){
  const result = await client.credentials.findUnique({
   where:{
    id
   }
  })
  
  return result;
}

export async function find(userId:number){
  const result = await client.credentials.findMany({
   where:{
    userId
   }
  })
  
  return result;
}

export async function deleteById(id:number){
  await client.credentials.delete({
   where:{
    id
   }
  })
  
}