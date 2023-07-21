import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { CheckInUseCase } from "./check-in"
import { describe, expect, it, beforeEach, vi, afterEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { Decimal } from "@prisma/client/runtime/library"





let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe("check-in Use Case",() => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        gymsRepository = new InMemoryGymsRepository()
        sut = new CheckInUseCase(checkInsRepository, gymsRepository)

        gymsRepository.item.push({
            id:"gym-01", 
            title:"JavaScript Gym", 
            descripption:"", 
            phone:"888585658",
            latitude:new Decimal(-7.2343752), 
            longitude:new Decimal(-39.3432483)
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("should be able to check-in", async () => {
       
        const {checkIn} = await sut.execute({
            userId:"user-01",
            gymId:"gym-01", 
            userLatitude:-7.2343752, 
            userLongitute:-39.3432483
        })

        console.log(checkIn.created_at)

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("should not be able to check-in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId:"user-01",
            gymId:"gym-01", 
            userLatitude:-7.2343752, 
            userLongitute:-39.3432483
        })



        await expect(() => sut.execute({
            gymId: "gym-01", 
            userId:"user-01", 
            userLatitude:-7.2343752, 
            userLongitute:-39.3432483
        })).rejects.toBeInstanceOf(Error)
    })

    it("should be able to check-in twice in differents days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

        await sut.execute({
            userId:"user-01",
            gymId:"gym-01", 
            userLatitude:-7.2343752, 
            userLongitute:-39.3432483
        })

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

        const {checkIn} = await sut.execute({
            userId:"user-01",
            gymId:"gym-01", 
            userLatitude:-7.2343752, 
            userLongitute:-39.3432483
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })


    it("should not be able to check-in on distant gym", async () => {
       
        const {checkIn} = await sut.execute({
            userId:"user-01",
            gymId:"gym-01", 
            userLatitude:-7.2343752, 
            userLongitute:-39.3432483
        })

        console.log(checkIn.created_at)

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("should not be able to check-in on distant gym", async () => {
        
        gymsRepository.item.push({
            id:"gym-02", 
            title:"JavaScript Gym", 
            descripption:"", 
            phone:"888585658",
            latitude:new Decimal(-7.2082713), 
            longitude:new Decimal(-39.2742575)
        })

        await expect(
            sut.execute({   
                userId:"user-01",
                gymId:"gym-02", 
                userLatitude:-7.2343752, 
                userLongitute:-39.3432483
            })).rejects.toBeInstanceOf(Error)
    })
})