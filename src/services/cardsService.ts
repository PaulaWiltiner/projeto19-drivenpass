import { findByTitleandUserId, insertCards, findById, find, deleteById, findType } from "../repositories/cardsRepository";
import { authenticateToken } from "../utils/authVerification";
import Cryptr from "cryptr";
import { TCards } from "../types/CardsTypes";

export async function createCards(data:TCards, token:string){
  const userId=await authenticateToken(token);
  const findOne=await findByTitleandUserId(data.title,userId);
  const findTyp = await findType(data.type)
  if (!findTyp) {
    throw {code:'NotFound' , message:'type not existis'}
  }
  if (findOne.length!==0) {
    throw {code:'Conflict' , message:'title already existis'}
  }

  const cryptr = new Cryptr('cardTotallySecretKey');
  const password= cryptr.encrypt(data.password);
  const cvc= cryptr.encrypt(data.cvc);
  data["password"]=password;
  data["cvc"]=cvc;

  const dataList=data
  await insertCards(dataList)
 
 }

 export async function getCardId(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);

  if(!result){
    throw {code:'NotFound' , message:'Card not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  const cryptr = new Cryptr('cardTotallySecretKey');
  const decryptedPass = cryptr.decrypt(result.password);
  const decryptedCvc = cryptr.decrypt(result.cvc);
  result["password"] = decryptedPass ;
  result["cvc"] = decryptedCvc ;
      

  return result
 }

 export async function getCards(token:string){
  const userId=await authenticateToken(token);
  const result = await find(userId);
  const cryptr = new Cryptr('cardTotallySecretKey');
  const response = result.map((item:any) => {
    const decryptedPass = cryptr.decrypt(item.password);
    const decryptedCvc = cryptr.decrypt(item.cvc);
    item["password"] = decryptedPass ;
    item["cvc"] = decryptedCvc ;
    return item;
  });
  return response
 }

 export async function deleteCard(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);
  if(!result){
    throw {code:'NotFound' , message:'Card not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  await deleteById(id);
 }