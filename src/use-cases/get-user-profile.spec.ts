import {beforeEach, describe, expect, it } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-user-repository"
import { GetUserProfileUserCase } from "./get-user-profile"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"


let usersRepository: InMemoryUsersRepository
let sut:GetUserProfileUserCase

describe("Authenticate Use Case", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUserCase(usersRepository)
    })


    it("should be able to get user profile", async () => {
     
        const createdUser =  await usersRepository.create({
            name: "john Doe",
            email:"izaelgomes12799@gmail.com", 
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual("john Doe")
    })


    it("should not be able to get user profile with wrong id", async () => {
 
        expect(async () => {
            await sut.execute({
                userId:"non-existing-id"
            })
        }).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})


