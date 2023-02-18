import * as jwt from "jsonwebtoken";
import { users } from "@prisma/client";

import { createUser } from "./factories";
import { createSession } from "./factories/sessions-factory";
import { client } from "@/config";

export async function cleanDb() {
  await client.cardType.deleteMany({});
  await client.cards.deleteMany({});
  await client.credentials .deleteMany({});
  await client.wifis.deleteMany({});
  await client.securityNotes.deleteMany({});
  await client.sessions.deleteMany({});
  await client.users.deleteMany({});
}

export async function generateValidToken(user?: users ) {
  const incomingUser = user || (await createUser());
  
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token,incomingUser);

  return token;
}