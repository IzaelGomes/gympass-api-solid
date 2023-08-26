import { describe, expect, it, beforeEach} from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"



let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case",() => {
    beforeEach(async () => {
        gymsRepository = new InMemoryGymsRepository()
      
        sut = new FetchNearbyGymsUseCase(gymsRepository)
   
    })

    it("should be able to nearby gyms", async () => {

        await gymsRepository.create({
            title:"Near",
            description: null, 
            phone: null,
            latitude:-7.2343752, 
            longitude:-39.3432483, 
        })

        await gymsRepository.create({
            title:"Far Gym",
            description: null, 
            phone: null,
            latitude:-5.963740, 
            longitude:-35.921842, 
        }) 

        const {gyms} = await sut.execute({
            userLatitude:-7.2343752, 
            userLongitude:-39.3432483
          
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:"Near"}),
        ])
    })


})