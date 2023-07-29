import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repositories"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"



interface ValidadeCheckInRequest{
    checkInId:string
}

interface ValidadeCheckInUseCaseResponse {
    checkIn:CheckIn
}

export class ValidadeCheckInUseCase{

    constructor( 
        private checkInsRepository:CheckInsRepository,
    ){}
    
    async execute({checkInId } : ValidadeCheckInRequest): Promise<ValidadeCheckInUseCaseResponse> {
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if(!checkIn) {
            throw new ResourceNotFoundError()
        }

        checkIn.validate_at = new Date()

        await this.checkInsRepository.save(checkIn)

        return {
            checkIn
        }
    }
}