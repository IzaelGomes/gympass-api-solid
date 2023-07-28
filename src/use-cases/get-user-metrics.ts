import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repositories"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"
import { MaxDistanceError } from "./erros/max-distance-error"
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-erros"


interface getUserMetricsUseCaseRequest{
    userId:string
}

interface getUserMetricsUseCaseResponse {
    checkInsCount:number
}

export class getUserMetricsUseCase{

    constructor( 
        private getUserMetricsRepository:CheckInsRepository ){}
    
    async execute({userId } : getUserMetricsUseCaseRequest): Promise<getUserMetricsUseCaseResponse> {
        const checkInsCount = await this.getUserMetricsRepository.countByUserId(userId)

        

        return {
            checkInsCount
        }
    }
}