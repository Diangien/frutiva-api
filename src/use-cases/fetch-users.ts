import { UsersRepository } from "@/repositories/users-repository";
import { User } from "generated/prisma";

interface FetchUsersUseCaseRequest{
    page: number;
}

interface FetchUsersUseCaseResponse{
    users: User[];
}

export class FetchUsersUseCase{
    constructor(private usersRepository:UsersRepository){};

    async execute({page}:FetchUsersUseCaseRequest):Promise<FetchUsersUseCaseResponse>{
        
        const users = await this.usersRepository.getAll(page);

        return {
            users
        }
    }
}