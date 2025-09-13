import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";

export class InMemoryUsersRepository implements UsersRepository{
    
    private users: User[] = [];

    async create(data: Prisma.UserCreateInput){
        const user:User = {
            id: crypto.randomUUID(),
            name: data.name,
            full_name: data.full_name,
            phone: data.phone,
            password_hash: data.password_hash,
            privilege: data.privilege,
            created_at: new Date(),
            picture: data.picture ?? null,
            email: data.email ?? null
        }

        this.users.push(user);

        return user;
    }

    async findByUserName(username: string) {
        const user = this.users.find(user => user.name == username);

        return user || null;
    }

    async getAll(page:number){
        return this.users.slice((page - 1) * 20, page*20);
    }
    
}