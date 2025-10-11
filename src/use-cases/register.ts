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
  email:string;
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ full_name, name, password, phone, privilege, email}: registerUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserNameAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      full_name,
      password_hash,
      phone,
      privilege,
      name,
      email
    });

    return {
      user,
    };
  }
}
