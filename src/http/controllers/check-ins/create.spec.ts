import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"


describe("Check-ins (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to create check in", async () => {
        const {token} = await createAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data:{    
                title:"JavaScript Gym", 
                latitude:-7.2343752, 
                longitude:-39.3432483, 
            }
        })

        const response =  await request(app.server).post(`/check-ins/${gym.id}/create`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude:-7.2343752,
                longitude:-39.3432483,
            })
    
        expect(response.statusCode).toEqual(201)
    })
})