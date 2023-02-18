import app, { init } from "@/app";
import faker from "@faker-js/faker";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /signIn", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/signIn");

    expect(response.status).toBe(422);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/signIn").send(invalidBody);

    expect(response.status).toBe(422);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(11),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await server.post("/signIn").send(body);

      expect(response.status).toBe(401);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post("/signIn").send({
        email: body.email,
        password: faker.lorem.word(11),
      });

      expect(response.status).toBe(401);
    });

    describe("when credentials are valid", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/signIn").send(body);

        expect(response.status).toBe(200);
      });

      it("should respond with userId", async () => {
        const body = generateValidBody();
        const user = await createUser(body);

        const response = await server.post("/signIn").send(body);

        expect(response.body.userId).toBeDefined()
      });

      it("should respond with session token", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await server.post("/signIn").send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
