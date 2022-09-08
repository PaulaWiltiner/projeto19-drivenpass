import { findByTitleandUserId, insertCredential, findById, find, deleteById } from "../repositories/credentialsRepository";
import { authenticateToken } from "../utils/authVerification";
import Cryptr from "cryptr";

export async function createCredential(url:string,name:string,newPassword:string,title:string,token:string){
  const userId=await authenticateToken(token);
  const findOne=await findByTitleandUserId(title,userId);
  console.log('find')
  console.log(findOne)
  if (findOne) {
    throw {code:'Conflict' , message:'title already existis'}
  }

  const cryptr = new Cryptr('cardTotallySecretKey');
  const password= cryptr.encrypt(newPassword);

  const dataList={
    url,
    name,
    password,
    userId,
    title
  }
  await insertCredential(dataList)
 
 }

 export async function getCredentialId(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);
  if(!result){
    throw {code:'NotFound' , message:'Credential not found'}
  }
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  return result
 }

 export async function getCredentials(token:string){
  const userId=await authenticateToken(token);
  const result = await find(userId);
  return result
 }

 export async function deleteCredential(id:number,token:string){
  const userId=await authenticateToken(token);
  const result= await findById(id);
  if(userId!==result.userId){
    throw {code:'Unathorized' , message:'user unathorized'}
  }
  await deleteById(id);
 }