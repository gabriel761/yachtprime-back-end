import {afterAll, beforeAll, expect, test} from "vitest";
import barcoSeminovoOutput from "./mocks/barcoSeminovoOutput.ts";
import barcoSeminovoInput from "./mocks/barcoSeminovoOutput.ts";
import axios,{AxiosRequestConfig} from 'axios'
import { TestDatabase } from "../infra/TestDatabase.ts";


function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function request(url: string, method: string, data?: any) {
    return axios({
        url, method, data, headers: {
            'Content-Type': 'application/json',
        }
    } as AxiosRequestConfig)
}

beforeAll(async ()=> {
    const testDatabase = new TestDatabase()
    await testDatabase.resetDbToInitialState()
})
// afterAll(async () => {
//     const testDatabase = new TestDatabase()
//     await testDatabase.resetDbToInitialState()
// })


test.skip("Should get full barcoSeminovo object with data from database", async () => {
    const response = await request("http://localhost:5000/barco/seminovo/1", "get")
    expect(response.data).toEqual(barcoSeminovoOutput)
})
test("Should get a response status of 404", async () => {
    const response = await fetch("http://localhost:5000/barco/seminovo/1")
    expect(response.status).toBe(404)
})
test("Should post barcoSeminovo into database", async () => {
    await request("http://localhost:5000/barco/seminovo", "post", barcoSeminovoInput)
    delay(1000)
    const response = await request("http://localhost:5000/barco/seminovo/1", "get")
    expect(response.data).toEqual(barcoSeminovoOutput)
})
test("Should delete barcoSeminovo successfully", async () => {
    await request("http://localhost:5000/barco/seminovo", "delete", {id:1})
    delay(1000)
    const response = await fetch("http://localhost:5000/barco/seminovo/1")
    expect(response.status).toBe(404)
})