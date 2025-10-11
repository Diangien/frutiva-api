import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeAll, describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: AuthenticateUseCase;

  beforeAll(async () => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);

    const password_hash = await hash("12345", 8);

    usersRepository.create({
      full_name: "Gustavo Guarana",
      name: "Gustavo",
      password_hash,
      phone: "912235467",
      email: "jose@gmail.com",
    });
  });

  it("should be able to authenticate", async () => {
    const { user } = await sut.execute({ email: "jose@gmail.com", password: "12345" });

    expect(user.name).toEqual("Gustavo");
  });

  it("should not be able to authenticate with wrong email", async () => {
    await expect(
      sut.execute({ email: "joe@gmail.com", password: "12345" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

   it("should not be able to authenticate with wrong password", async () => {
    await expect(
      sut.execute({ email: "jose@gmail.com", password: "1234" })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
