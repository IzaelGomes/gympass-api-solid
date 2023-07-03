import { UsersRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { userAlreadyExists } from "./erros/user-already-exists-error"

interface registerUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {

    constructor( private usersRepository: UsersRepository) {
    }

    async execute({ name, email, password } : registerUseCaseRequest ) {
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail) {
            throw new userAlreadyExists()
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        })
    }
}
