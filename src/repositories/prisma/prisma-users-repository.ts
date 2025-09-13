import { prisma } from "@/lib/prisma";
import { Prisma, User } from "generated/prisma";
import { UsersRepository } from "../users-repository";

export class PrismaUsersRepository implements UsersRepository{
    async getAll(page:number) {
        const users = await prisma.user.findMany({
           take: 20,
           skip: (page - 1) * 20
        })

        return users;
    }

    async create(data:Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        });

        return user;
    }

    async findByUserName(username: string) {
        const user = await prisma.user.findUnique({
            where:{
                name: username
            }
        });

        return user || null;
    }
}