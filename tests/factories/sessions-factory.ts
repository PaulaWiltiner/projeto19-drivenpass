import { sessions , users} from "@prisma/client";
import { createUser } from "./users-factory";
import { client } from "@/config";

export async function createSession(token: string, user: users): Promise<sessions> {

  return client.sessions.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}

