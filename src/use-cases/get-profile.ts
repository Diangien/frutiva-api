import { UsersRepository } from "@/repositories/users-repository";
import { User } from "generated/prisma";
import { UserNotExistsError } from "./errors/user-not-exists-error";

interface GetProfileUseCaseRequest {
  id: string;
}

interface GetProfileUseCaseResponse {
  user: User;
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {

    const user = await this.usersRepository.findById(id);

    if(!user){
        throw new UserNotExistsError();
    }

    return {user};
  }
}
