import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { expect, test, describe, it } from "vitest"
import { RegisterUseCase } from "./register"
import { compare } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { userAlreadyExists } from "./erros/user-already-exists-error"


describe("Register Use Case", () => {

    it("should be able to register", async () =>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

        const { user } = await registerUseCase.execute({
            name:"izael", 
            email:"izaelgomes12799@gmail.com", 
            password:"123456"
        })


        expect(user.id).toEqual(expect.any(String))
    })


    it("should hash user password upon registration", async () =>{
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

        const { user } = await registerUseCase.execute({
            name:"izael", 
            email:"izaelgomes12799@gmail.com", 
            password:"123456"
        })

        const isPasswordCorrectlyHashed = await compare(
            "123456", 
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it("should not be able to register with same email twice", async ()=> {
        const inMemoryUsersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

        const email = "izaelgomes12799@gmail.com"

        await registerUseCase.execute({
            name:"izael", 
            email, 
            password:"123456"
        })

        expect( async () => {
            await registerUseCase.execute({
                name:"izael", 
                email, 
                password:"123456"
            })
    
        }).rejects.toBeInstanceOf(userAlreadyExists)

 
    })
})