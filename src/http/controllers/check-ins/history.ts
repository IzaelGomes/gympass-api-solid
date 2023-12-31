import { z } from "zod"
import { FastifyRequest, FastifyReply} from "fastify"
import { makeUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history"


export async function history(request:FastifyRequest, reply:FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
        page: z.coerce.number().default(1),
    })

    const {page} =  checkInHistoryQuerySchema.parse(request.params)

    
    const fetchCheckInHistoryUseCase = makeUserCheckInsHistoryUseCase()
    const {checkIns} = await fetchCheckInHistoryUseCase.execute({page,userId:request.user.sub})
  


    return reply.status(200).send({
        checkIns
    })

}