import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"


describe("Gyms (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to get nearby gym", async () => {
        const {token} = await createAndAuthenticateUser(app, true)

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`).send({
                phone:"8898989889898",
                title:"Js",
                description:"A melhor",
                latitude:-7.2670764,
                
                longitude:-40.8775753, 
            })

        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`).send({
                phone:"8898989889898",
                title:"Js",
                description:"A melhor",
                latitude:-7.227503, 
                longitude:-39.3285508, 
            })


        const response =  await request(app.server).get("/gyms/nearby").query({
            latitude: -7.227503,
            longitude: -39.3285508,
        }).set("Authorization", `Bearer ${token}`).send()
    
        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title:"Js"
            })
        ])
    })
})