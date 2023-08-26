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


    it("should be able to create gym", async () => {
        const {token} = await createAndAuthenticateUser(app, true)

        const response =  await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            latitude:-27.5453535,
            longitude:-47.5453535,
            phone:"8898989889898",
            title:"Js",
            description:"A melhor"
        })
    
        expect(response.statusCode).toEqual(201)
    })
})