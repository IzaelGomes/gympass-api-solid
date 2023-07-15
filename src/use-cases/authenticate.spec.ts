import {beforeEach, describe, expect, it } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { AuthenticateUseCase } from "./authenticate"
import { InvalidCredentialsError } from "./erros/invalid-credentials-error"


let usersRepository: InMemoryUsersRepository
let sut:AuthenticateUseCase

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })


    it("should be able to authenticate", async () => {
     
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
 
        expect(async () => {
            await sut.execute({
                email:"izaelgomes12799@gmail.com", 
                password:"1234568"
            })
        }).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("should be able to authenticate with wrong password", async () => {
       
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


