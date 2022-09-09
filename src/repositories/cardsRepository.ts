
import  client  from "../config/prisma";
import { TCards } from "../types/CardsTypes";


export async function insertCards(dataList:TCards){
  const result = await client.cards.create({
   data: dataList
  })
  
  return result;
}

export async function findByTitleandUserId(title:string,userId:number){
  const result = await client.cards.findMany({
   where:{
    userId,
    title
   }
  })
  
  return result;
}

export async function findById(id:number){
  const result = await client.cards.findUnique({
   where:{
    id
   }
  })
  
  return result;
}

export async function find(userId:number){
  const result = await client.cards.findMany({
   where:{
    userId
   }
  })
  
  return result;
}

export async function deleteById(id:number){
  await client.cards.delete({
   where:{
    id
   }
  })
  
}

export async function findType(id:number){
  const result = await client.cardType.findUnique({
   where:{
    id
   }
  })
  
  return result;
}