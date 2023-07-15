import { CheckIn, Prisma } from "@prisma/client"
import { CheckInsRepository } from "../check-ins-repositories"
import { randomUUID } from "node:crypto"


export class InMemoryCheckInsRepository implements CheckInsRepository {
 
    public items:CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput){

        const checkIn = {
            id: randomUUID(), 
            created_at:new Date(),
            validate_at:data.validate_at ? new Date(data.validate_at) : null,
            gym_Id: data.gym_id,
            user_id: data.user_id
        }

        this.items.push(checkIn)

        return checkIn
    }

}
