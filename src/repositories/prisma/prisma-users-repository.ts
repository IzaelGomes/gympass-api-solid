import { prisma } from "@/lib/prisma"
import { Prisma, User } from "@prisma/client"
import { UsersRepository } from "../users-repository"
import { GetResult } from "@prisma/client/runtime"

export class PrismaUsersRepository implements UsersRepository {
    findById(id: string): Promise<User | null>{
        throw new Error("Method not implemented.")
    }
    async findByEmail(email: string): Promise<User | null> {
        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        return userWithSameEmail
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({
            data
        })
        return user
    }
} 