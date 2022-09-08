import  client  from "../config/prisma";
import { TUsers } from "../types/AuthTypes";

export async function findByEmail(email:string) {
  const result = await client.users.findUnique({
    where: {
      email
    }
  })
  
  return result;
}

export async function insertUser(dataList:TUsers) {
  await client.users.create({
    data: dataList
  });

}
