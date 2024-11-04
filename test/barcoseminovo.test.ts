import {beforeAll, expect, test} from "vitest";
import barcoSeminovo from "./mocks/barco_seminovo.ts";
import axios,{AxiosRequestConfig} from 'axios'

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

//beforeAll(async ()=> { await delay(300)})




test.skip("Should get full barcoSeminovo object with data from database", async () => {
    const response = await request("http://localhost:5000/barco/seminovo/1", "get")
    expect(response.data).toEqual(barcoSeminovo)
})
test("Should get a response status of 404", async () => {
    const response = await fetch("http://localhost:5000/barco/seminovo/1")
    expect(response.status).toBe(404)
})
test("Should post barcoSeminovo into database", async () => {
    await request("http://localhost:5000/barco/seminovo", "post", barcoSeminovo)
    delay(500)
    const response = await request("http://localhost:5000/barco/seminovo/1", "get")
    expect(response.data).toEqual(barcoSeminovo)
})