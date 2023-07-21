import { GymsRepository } from "../gyms-repository"
import { Gym } from "@prisma/client"


export class InMemoryGymsRepository implements GymsRepository {
    public item: Gym[] = []

    async findById(id: string) {
        const gym = this.item.find((item) => item.id === id)

        if(!gym) {
            return null
        }
        
        return gym
    } 
}