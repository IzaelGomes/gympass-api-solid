import fastify from "fastify"
import { usersRoutes } from "./http/controllers/users/routes"
import { ZodError } from "zod"
import { env } from "./env"
import fastifyJwt from "@fastify/jwt"
import { gymsRoutes } from "./http/controllers/gyms/routes"
import { checkInsRoutes } from "./http/controllers/check-ins/route"
import fastifyCookie from "@fastify/cookie"


export const app = fastify()


app.register(fastifyJwt, {
    secret:env.JWT_SECRET,
    cookie:{
        cookieName:"refreshToken", 
        signed:false
    }, 
    sign:{
        expiresIn:"10m", 
    }
})
app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
app.register(fastifyCookie)

app.setErrorHandler((error, _, reply) => {
    if ( error instanceof ZodError) {
        return reply.status(400).send({
            message:"validation error.", 
            issues:error.format()
        })
    }

    if (env.NODE_ENV !== "production") {
        console.log(error)
    }else {
        // here we shoud log to an external tool like DataDog/NewRelic/Sentry
    }

    return reply.status(500).send({message: "internal server error."})
})