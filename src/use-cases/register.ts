import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { UserNameAlreadyExistsError } from "./errors/username-already-exists-error";
import { UsersRepository } from "@/repositories/users-repository";

type UserPrivilege = "admin" | "stock" | "sales";

interface registerUseCaseRequest {
  name: string;
  full_name: string;
  password: string;
  phone: string;
  privilege: UserPrivilege;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ full_name, name, password, phone, privilege }: registerUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameName = await this.usersRepository.findByUserName(name);

    if (userWithSameName) {
      throw new UserNameAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      full_name,
      password_hash,
      phone,
      privilege,
      name,
    });

    return {
      user,
    };
  }
}
