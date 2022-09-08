import  client  from "../config/prisma";
import { TSessions, TUsers } from "../types/AuthTypes";

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

export async function findUser(dataList:TUsers) {
  const result = await client.users.findUnique({
    where: dataList
  })
  
  return result;
}

export async function insertSession(dataList:TSessions) {
  await client.sessions.create({
    data: dataList
  });
}

export async function findSession(token:any) {
  const result = await client.sessions.findUnique({
    where: {
      token
    }
  })
  
  return result;
}

export async function deletesSession(token:any) {
  const result = await client.sessions.delete({
    where: {
      token
    }
  })
  
  return result;
}