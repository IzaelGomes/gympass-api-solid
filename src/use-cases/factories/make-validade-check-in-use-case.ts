
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository"
import { ValidadeCheckInUseCase } from "../validade-check-in"

export function makeGetUserMetricsUseCase() {
    const checkInsRepository = new PrismaCheckInsRepository()
    const useCase = new ValidadeCheckInUseCase(checkInsRepository)

    return useCase
}   