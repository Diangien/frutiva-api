import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { FetchUsersUseCase } from "./fetch-users";

describe("Fetch users use case", () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: FetchUsersUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new FetchUsersUseCase(usersRepository);
  });

  it("should be able to fetch 20 users by page", async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        full_name: "Ana Dias",
        name: `user-${i}`,
        password_hash: "1234",
        phone: "923456789",
        privilege: "admin",
      });
    }

    const { users } = await sut.execute({page: 2});

    expect(users).toHaveLength(2);
    expect(users).toEqual([
      expect.objectContaining({ name: "user-21" }),
      expect.objectContaining({ name: "user-22" }),
    ]);
  });
});
