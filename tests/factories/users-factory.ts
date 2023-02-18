import bcrypt from "bcrypt";
import faker from "@faker-js/faker";
import { users } from "@prisma/client";
import { client } from "@/config";

export async function createUser(params: Partial<users> = {}): Promise<users> {
  const incomingPassword = params.password || faker.internet.password(10);
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return client.users.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}
