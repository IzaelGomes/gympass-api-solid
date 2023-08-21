import { z } from "zod"
import { FastifyRequest, FastifyReply} from "fastify"
import { makeValidadeCheckIn } from "@/use-cases/factories/make-validade-check-in-use-case"


export async function validate(request:FastifyRequest, reply:FastifyReply) {
    const validadeCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    })
 
    const {checkInId} =  validadeCheckInParamsSchema.parse(request.query)

    
    const validadeCheckInUseCase = makeValidadeCheckIn()
    await validadeCheckInUseCase.execute({checkInId})
  


    return reply.status(204).send()

}