import { findByNameandUserId, insertWifi, findById, find, deleteById } from "../repositories/wifisRepository";
import { authenticateToken } from "../utils/authVerification";
import Cryptr from "cryptr";

export async function createWifi(name:string,newPassword:string,token:string){
  const userId=await authenticateToken(token);
  const findOne=await findByNameandUserId(name,userId);
 
  if (findOne.length!==0) {
    throw {code:'Conflict' , message:'title already existis'}
  }

  const cryptr = new Cryptr('cardTotallySecretKey');
  const password= cryptr.encrypt(newPassword);

  const dataList={
    userId,
    name,
    password
  }
  await insertWifi(dataList)
 
 }

 export async function getWifiId(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);

  if(!result){
    throw {code:'NotFound' , message:'Wifi not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  const cryptr = new Cryptr('cardTotallySecretKey');
  const decryptedPass = cryptr.decrypt(result.password);
  result["password"] = decryptedPass ;
      

  return result
 }

 export async function getWifis(token:string){
  const userId=await authenticateToken(token);
  const result = await find(userId);
  const cryptr = new Cryptr('cardTotallySecretKey');
  const response = result.map((item:any) => {
    const decryptedPass = cryptr.decrypt(item.password);
    item["password"] = decryptedPass
    return item;
  });
  return response
 }

 export async function deleteWifi(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);
  if(!result){
    throw {code:'NotFound' , message:'Wifi not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  await deleteById(id);
 }