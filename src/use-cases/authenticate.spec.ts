import {describe, expect, it } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"


describe("Authenticate Use Case", () => {
    it("should be able to authenticate", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: "john Doe",
            email:"izaelgomes12799@gmail.com", 
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            email:"izaelgomes12799@gmail.com", 
            password:"123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })


    it("should not be able to authenticate with wrong email", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)


        expect(async () => {
            await sut.execute({
                email:"izaelgomes12799@gmail.com", 
                password:"1234568"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("should be able to authenticate with wrong password", async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            name: "john Doe",
            email:"izaelgomes12799@gmail.com", 
            password_hash: await hash("123456", 6)
        })

        expect(async () => {
            await sut.execute({
                email:"izaelgomes12799@gmail.com", 
                password:"123123"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})


