
import  client  from "../config/prisma";
import { TWifis } from "../types/WifisTypes";


export async function insertWifi(dataList:TWifis){
  const result = await client.wifis.create({
   data: dataList
  })
  
  return result;
}

export async function findByNameandUserId(name:string,userId:number){
  const result = await client.wifis.findMany({
   where:{
    userId,
    name
   }
  })
  
  return result;
}

export async function findById(id:number){
  const result = await client.wifis.findUnique({
   where:{
    id
   }
  })
  
  return result;
}

export async function find(userId:number){
  const result = await client.wifis.findMany({
   where:{
    userId
   }
  })
  
  return result;
}

export async function deleteById(id:number){
  await client.wifis.delete({
   where:{
    id
   }
  })
  
}