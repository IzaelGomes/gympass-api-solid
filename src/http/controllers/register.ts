import { z } from "zod"
import { FastifyRequest, FastifyReply} from "fastify"
import { RegisterUseCase } from "@/use-cases/register"
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { userAlreadyExists } from "@/use-cases/erros/user-already-exists-error"


export async function register(request:FastifyRequest, reply:FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, email, password} =  registerBodySchema.parse(request.body)

    try {
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)
        
        await registerUseCase.execute({name, email, password})
    } catch (error) {
        if (error instanceof userAlreadyExists){
            return reply.status(409).send({message:error.message})
        }

        throw error
    }
  

    return reply.status(201).send()

}