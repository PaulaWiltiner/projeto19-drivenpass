import app, { init } from "@/app";
import faker from "@faker-js/faker";
import * as jwt from "jsonwebtoken";
import supertest from "supertest";
import { createUser } from "../factories";
import { createCredentials } from "../factories/credentials";

import { cleanDb, generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /credentials", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/credentials");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/credentials").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/credentials").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {

    it("should respond with status 200 and data when there is credential for given user", async () => {
      const user = await createUser();
      const credential = await createCredentials(user);
      const token = await generateValidToken(user);
      const response = await server.get("/credentials").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        expect.objectContaining({
        id: expect.any(Number),    
        url: expect.any(String),
        name: expect.any(String),
        password: credential.pass,
        userId: expect.any(Number),
        title: expect.any(String)
        })
      ]);
    });
  });
});

describe("GET /credentials/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/credentials/:id");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.get("/credentials/:id").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get("/credentials/:id").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });
  
  describe("when token is valid", () => {
    it("should respond with status 401 if there is no id for given user", async () => {
      
      const user = await createUser();
      const credential = await createCredentials(user);
      const token = await generateValidToken();

      const response = await server.get(`/credentials/${credential.body.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });
    it("should respond with status 404 if id not found", async () => {
      
      const token = await generateValidToken();

      const response = await server.get(`/credentials/0`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
    it("should respond with status 200 and data when id is valid", async () => {
      const user = await createUser();
      const credential = await createCredentials(user);
      const token = await generateValidToken(user);
      const response = await server.get(`/credentials/${credential.body.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        id: expect.any(Number),    
        url: expect.any(String),
        name: expect.any(String),
        password: credential.pass,
        userId: expect.any(Number),
        title: expect.any(String)
      });
    });
  });
});

describe("POST /credentials", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/credentials");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {

    describe("when body is valid", () => {
      const generateValidBody = () => ({
        url:  faker.internet.url(),
        password: faker.internet.password(5),
        title: faker.lorem.word(10),
        name: faker.lorem.word(10)
      });

      it("should respond with status 201 and create new credential if there is not any", async () => {
        const body = generateValidBody();
        const token = await generateValidToken();
        const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(body);

        expect(response.status).toBe(201);
      });

      
    });

    describe("when body is invalid", () => {
      const generateInvalidBody = () => ({
        url:  faker.internet.url(),
        password: faker.internet.password(2),
        title: faker.lorem.word(2),
        name: 1234
      });

      it("should respond with status 422 when body is invalid", async () => {
        const body = generateInvalidBody();
        const token = await generateValidToken();

        const response = await server.post("/credentials").set("Authorization", `Bearer ${token}`).send(body);

        expect(response.status).toBe(422);
      });
    });
  });
});

describe("delete /credentials/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/credentials/:id");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server.delete("/credentials/:id").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.delete("/credentials/:id").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {

    it("should respond with status 401 when there is no id for given user ", async () => {
      const user = await createUser();
      const credential = await createCredentials(user);
      const token = await generateValidToken();

      const response = await server.delete(`/credentials/${credential.body.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("should respond with status 404 when id is invalid", async () => {
        
      const token = await generateValidToken();

      const response = await server.delete("/credentials/0").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });


      it("should respond with status 200 and delete credential if there is not any", async () => {
        const user = await createUser();
        const credential = await createCredentials(user);
        const token = await generateValidToken(user);
        const response = await server.delete(`/credentials/${credential.body.id}`).set("Authorization", `Bearer ${token}`);
        
        expect(response.status).toBe(200);
      });
    
  });
});