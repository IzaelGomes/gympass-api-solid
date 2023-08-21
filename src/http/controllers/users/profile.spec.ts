import { describe, it, expect, beforeAll, afterAll } from "vitest"
import { app } from "@/app"
import request from "supertest"
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user"


describe("Profile (e2e)", () => {

    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })


    it("should be able to get user profile information", async() => {
        const {token} = await createAndAuthenticateUser(app)

        const user = await request(app.server).get("/me").set("Authorization", `Bearer ${token}`)

        

        expect(user.statusCode).toEqual(200)
        expect(user.body.user).toEqual(expect.objectContaining({
            email:"derick@gmail.com"
        }))
    })
})