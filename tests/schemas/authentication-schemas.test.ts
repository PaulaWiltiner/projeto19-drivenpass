import { signupSchema } from "../../src/schemas/signUpSchema";
import faker from "@faker-js/faker";

describe("signInSchema", () => {
  const generateValidInput = () => ({
    email: faker.internet.email(),
    password: faker.internet.password(11),
  });

  describe("when email is not valid", () => {
    it("should return error if email is not present", () => {
      const input = generateValidInput();
      delete input.email;

      const { error } = signupSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if email does not follow valid email format", () => {
      const input = generateValidInput();
      input.email = faker.lorem.word();

      const { error } = signupSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when password is not valid", () => {
    it("should return error if password is not present", () => {
      const input = generateValidInput();
      delete input.password;

      const { error } = signupSchema.validate(input);

      expect(error).toBeDefined();
    });

    it("should return error if password is not a string", () => {
      const input = generateValidInput();

      const { error } = signupSchema.validate({ ...input, password: faker.datatype.number() });

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();

    const { error } = signupSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
