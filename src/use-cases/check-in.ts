import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/check-ins-repositories"
import { GymsRepository } from "@/repositories/gyms-repository"
import { ResourceNotFoundError } from "./erros/resource-not-found-error"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates"
import { MaxDistanceError } from "./erros/max-distance-error"
import { MaxNumberOfCheckInsError } from "./erros/max-number-of-check-ins-erros"


interface CheckInRequest{
    userId:string
    gymId:string
    userLatitude:number
    userLongitute:number
}

interface CheckInUseCaseResponse {
    checkIn:CheckIn
}

export class CheckInUseCase{

    constructor( 
        private checkInsRepository:CheckInsRepository,
        private gymsRepository: GymsRepository
        
    ){}
    
    async execute({userId, gymId, userLatitude, userLongitute } : CheckInRequest): Promise<CheckInUseCaseResponse> {
        const gym = await this.gymsRepository.findById(gymId)

        if(!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude:userLatitude, longitude: userLongitute}, 
            {latitude:gym.latitude.toNumber(), longitude:gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS = 0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS) {
            throw new MaxDistanceError()
        }
        
        const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userId, new Date())

        if(checkInOnSameDate) {
            throw new MaxNumberOfCheckInsError()
        }
        
        const checkIn = await this.checkInsRepository.create({
            gym_id:gymId, 
            user_id:userId
        })

        return {
            checkIn
        }
    }
}