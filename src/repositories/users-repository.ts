import { Prisma, User } from "generated/prisma";

export interface UsersRepository{
    create(data:Prisma.UserCreateInput):Promise<User>;
    findByUserName(username: string):Promise<User | null>;
    getAll(page:number):Promise<User[]>;
    findById(id: string):Promise<User | null>;
}