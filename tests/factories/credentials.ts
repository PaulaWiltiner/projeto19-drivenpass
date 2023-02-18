import faker from "@faker-js/faker";
import { users } from "@prisma/client";
import Cryptr from "cryptr";
import { client } from "@/config";

export async function createCredentials(user: users) {
  const incomingUser = user;
  const newPassword = faker.internet.password(4);
  const cryptr = new Cryptr('cardTotallySecretKey');
  const password= cryptr.encrypt(newPassword);
  const result = await client.credentials.create({
    data: {
      url:  faker.internet.url(),
      password: password,
      title: faker.lorem.word(10),
      name: faker.lorem.word(10),
      userId: incomingUser.id
    }
  });

  return {body:result,pass: newPassword}
}
