import {afterAll, beforeAll, expect, test} from "vitest";
import barcoSeminovoOutput from "./mocks/barcoSeminovoOutput.ts";
import barcoSeminovoInput from "./mocks/barcoSeminovoOutput.ts";
import axios,{AxiosRequestConfig} from 'axios'
import { TestDatabase } from "../infra/TestDatabase.ts";
import { tipoCombustivelList } from "./mocks/tipoCombustivelList.ts";
import { tipoPropulsao } from "./mocks/tipoPropulsaoList.ts";
import { modelos } from "./mocks/modelos.ts";
import motores from "./mocks/motores.ts";
import moedas from "./mocks/moedas.ts";



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
afterAll(async () => {
    const testDatabase = new TestDatabase()
    await testDatabase.resetDbToInitialState()
})


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
test("Should get tipo combustível list", async ()=> {
    const response = await request("http://localhost:5000/resources/seminovo/combustivel", "get")
    expect(response.data).toEqual(tipoCombustivelList)
})

test("Should get tipo propulsão list", async () => {
    const response = await request("http://localhost:5000/resources/seminovo/propulsao", "get")
    expect(response.data).toEqual(tipoPropulsao)
})

test("Should get modelo list", async () => {
    const response = await request("http://localhost:5000/resources/seminovo/modelo", "get")
    expect(response.data).toEqual(modelos)
})
test("Should get motores list", async () => {
    const response = await request("http://localhost:5000/resources/seminovo/motor", "get")
    expect(response.data).toEqual(motores)
})
test("Should get moeda list", async () => {
    const response = await request("http://localhost:5000/resources/moeda", "get")
    expect(response.data).toEqual(moedas)
})

test("Should get itens seminovo list", async () => {
    const response = await request("http://localhost:5000/resources/seminovo/item-seminovo", "get")
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array); 
    expect(response.data).toEqual(
        expect.arrayContaining([
            expect.objectContaining({ id: 1, item: "Adega para vinhos"}),
            expect.objectContaining({ id: 2, item: "Alfa Laval" }),
        ])
    );
})