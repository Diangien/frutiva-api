import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { UserNameAlreadyExistsError } from "./errors/username-already-exists-error";
import { compare } from "bcryptjs";

describe("Register Use Case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: RegisterUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register a user", async () => {
    const { user } = await sut.execute({
      full_name: "Diangienda Nkana",
      name: "Astro123",
      password: "123456",
      phone: "912216481",
      privilege: "admin",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to register with same username twice", async () => {
    await sut.execute({
      full_name: "Diangienda Nkana",
      name: "Astro123",
      password: "123456",
      phone: "912216481",
      privilege: "admin",
    });

    await expect(
      sut.execute({
        full_name: "Dogo Nkana",
        name: "Astro123",
        password: "123489",
        phone: "919826481",
        privilege: "sales",
      })
    ).rejects.toBeInstanceOf(UserNameAlreadyExistsError);
  });

  it("should be able to hash password", async()=>{
     const { user } = await sut.execute({
      full_name: "Diangienda Nkana",
      name: "Astro123",
      password: "123456",
      phone: "912216481",
      privilege: "admin",
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true);
  })
});
