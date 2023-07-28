import {beforeEach, describe, expect, it } from "vitest"
import { hash } from "bcryptjs"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { getUserMetricsUseCase } from "./get-user-metrics"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"


let checkInsRepository: InMemoryCheckInsRepository
let sut:getUserMetricsUseCase

describe("Get User Metrics Use Case", () => {
    beforeEach(() => {
        checkInsRepository = new InMemoryCheckInsRepository()
        sut = new getUserMetricsUseCase(checkInsRepository)
    })


    it("should be able to get check-ins count from metrics", async () => {
     
        await checkInsRepository.create({
            gym_id: "gym-01",
            user_id:"user-01", 
        })

        await checkInsRepository.create({
            gym_id: "gym-02",
            user_id:"user-01", 
        })

        const { checkInsCount } = await sut.execute({
            userId: "user-01"
        })

        expect(checkInsCount).toEqual(2)
    })


})


