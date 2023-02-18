import faker from "@faker-js/faker";
import { users } from "@prisma/client";
import Cryptr from "cryptr";
import { client } from "@/config";

export async function createWifi(user: users) {
  const incomingUser = user;
  const newPassword = faker.internet.password(4);
  const cryptr = new Cryptr('cardTotallySecretKey');
  const password= cryptr.encrypt(newPassword);
  const result = await client.wifis.create({
    data: {
      password: password,
      name: faker.lorem.word(10),
      userId: incomingUser.id
    }
  });

  return {body:result,pass: newPassword}
}
