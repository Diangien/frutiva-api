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

  it("should be able to fetch all users", async()=>{
    await usersRepository.create({
        full_name:"Ana Dias",
        name:"Ananas",
        password_hash:"1234",
        phone:"923456789",
        privilege:"admin"
    })

     await usersRepository.create({
        full_name:"Rui Dias",
        name:"Rui",
        password_hash:"1234",
        phone:"923456789",
        privilege:"sales"
    })

    const { users } = await sut.execute()

    expect(users).toHaveLength(2);
    expect(users).toEqual([
        expect.objectContaining({name:"Ananas"}),
        expect.objectContaining({name:"Rui"}),
    ])
  })
});
