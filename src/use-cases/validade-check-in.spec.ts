import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest"
import { ValidadeCheckInUseCase } from "./validade-check-in"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"



let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase

describe("validate Use Case",() => {
    beforeEach(async () => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new ValidadeCheckInUseCase(checkInsRepository)

       

        // vi.useFakeTimers()
    })

    afterEach(() => {
        // vi.useRealTimers()
    })

    it("should be able to validate check-in", async () => {
        const checkIn = await checkInsRepository.create({
            gym_id:"gym-01", 
            user_id:"user_id:"

        })
       
        await sut.execute({
            checkInId:checkIn.id  
        })


        expect(checkIn.validate_at).toEqual(expect.any(Date))
        expect(checkInsRepository.items[0].validate_at).toEqual(expect.any(Date))
    })

    it("should not be able to validate an inexistent check-in", async () => {

        await checkInsRepository.create({
            gym_id:"gym-01", 
            user_id:"user_id:"

        })
       
        await expect(() =>  
            sut.execute({
                checkInId:"inexistent-id"
            })).rejects.toBeInstanceOf(ResourceNotFoundError)

    })



})