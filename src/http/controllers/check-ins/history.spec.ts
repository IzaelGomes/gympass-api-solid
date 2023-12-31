import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"
import { prisma } from "@/lib/prisma"


describe("History (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to list history of check ins", async () => {
        const {token} = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data:{    
                title:"JavaScript Gym", 
                latitude:-7.2343752, 
                longitude:-39.3432483,
                
            }
        })

        await prisma.checkIn.createMany({
            data:[
                {
                    gym_id:gym.id, 
                    user_id:user.id 
                }, 
                {
                    gym_id:gym.id,
                    user_id:user.id 
                }
            ]
        })


        const response = await request(app.server)
            .get("/check-ins/history")
            .set("Authorization", `Bearer ${token}`)
            .send()
    
       
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id:gym.id, 
                user_id:user.id 
            }), 

            expect.objectContaining({
                gym_id:gym.id, 
                user_id:user.id 
            })
        ])
    })
})