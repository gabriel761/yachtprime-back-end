import axios, { AxiosRequestConfig } from "axios";
import { afterAll, beforeAll, expect, describe, test } from "vitest"
import { TestDatabase } from "../infra/TestDatabase";
import { userOutput } from "./mocks/userOutput";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function request(url: string, method: string, data?: any) {
    return axios({
        url, method, data, headers: {
            'Content-Type': 'application/json',
            Authorization: "test"
        }
    } as AxiosRequestConfig)
}

beforeAll(async () => {
    const testDatabase = new TestDatabase()
    await testDatabase.resetDbToInitialState()
})
afterAll(async () => {
    const testDatabase = new TestDatabase()
    await testDatabase.resetDbToInitialState()
})

describe("Manage users for the admin dashboard", () => {
    test("should get user", async () => {
        const user = await request("http://localhost:5000/user/user/1", "get")
        expect(user.data).toEqual(userOutput)
    })
})