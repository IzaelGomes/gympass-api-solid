import { FastifyInstance } from "fastify"

import { verifyJwt } from "../../middlewares/verify-jwt"
import { create } from "./create"
import { validate } from "./validate"
import { metrics } from "./metrics"
import { history } from "./history"


export async function checkInsRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJwt)

 
    app.post("/gyms/:gymId/check-ins", create)
    app.patch("/gyms/:gymId/check-ins", validate)

    app.get("/check-ins/metrics", metrics)
    app.get("/check-ins/history", history)
    

}