import app, { init } from "@/app";
import { client } from "@/config";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /signUp", () => {
  it("should respond with status 422 when body is not given", async () => {
    const response = await server.post("/signUp");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/signUp").send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(11),
    });


      it("should respond with status 409 when there is an user with given email", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/signUp").send(body);

        expect(response.status).toBe(409);
      });

      it("should respond with status 201 and create user when given email is unique", async () => {
        const body = generateValidBody();

        const response = await server.post("/signUp").send(body);

        expect(response.status).toBe(201);
      });

      it("should not return user password on body", async () => {
        const body = generateValidBody();

        const response = await server.post("/signUp").send(body);

        expect(response.body).not.toHaveProperty("password");
      });
    });
});
