import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import request from "supertest"


describe("Authenticate (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to register", async() => {
        await request(app.server).post("/users").send({
            name:"Derick", 
            email:"derick@gmail.com", 
            password:"123456"
        })

        const response = await request(app.server).post("/session").send({
            email:"derick@gmail.com", 
            password:"123456"
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token:expect.any(String)
        })
    })
})