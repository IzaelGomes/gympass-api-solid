import { UsersRepository } from "@/repositories/users-repository"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"
import { compare } from "bcryptjs"
import { User } from "@prisma/client"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"


interface GetUserProfileUserCaseRequest{
    userId:string
}

interface GetUserProfileUserCaseReponse {
    user:User
}

export class GetUserProfileUserCase{

    constructor( private usersRepository:UsersRepository){}
    
    async execute({userId} : GetUserProfileUserCaseRequest): Promise<GetUserProfileUserCaseReponse> {
        const user = await this.usersRepository.findById(userId)

        if(!user) {
            throw new ResourceNotFoundError()
        }

        return {
            user
        }
    }
}