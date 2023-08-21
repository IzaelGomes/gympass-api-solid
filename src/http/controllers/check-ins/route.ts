import { FastifyInstance } from "fastify"

import { verifyJwt } from "../../middlewares/verify-jwt"
import { create } from "./create"
import { validate } from "./validate"
import { metrics } from "./metrics"
import { history } from "./history"


export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)

 
    app.post("/check-ins/:gymId/create", create)
    app.patch("/check-ins/:checkInId/validate", validate)

    app.get("/check-ins/metrics", metrics)
    app.get("/check-ins/history", history)
    

}