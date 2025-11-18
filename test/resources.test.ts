import { afterAll, beforeAll, expect } from "vitest"
import { TestDatabase } from "../infra/TestDatabase"
import { describe, test } from "vitest"
import axios, { AxiosRequestConfig } from "axios";
import { modeloInput } from "./mocks/modeloInput";
import db from "../infra/database";
import { motorInput } from "./mocks/motorInput";
import { itemCharter } from "./mocks/itemCharter";
import { itemSeminovo } from "./mocks/itemSeminivo";
import { proprietario, proprietarioWithId } from "./mocks/proprietario";
import { ResourcesService } from "../service/ResourcesService";


const resourcesService = new ResourcesService()

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


describe("Resources for both boat types or none of them", () => {
    test("Should post modelo barco", async () => {
        request("http://localhost:5000/resources/modelo", "post", modeloInput)
        await delay(100)
        const modeloDB = await db.oneOrNone("SELECT marca, modelo FROM modelo_barco WHERE modelo = 'teste' AND marca = 'teste'").catch((error) => {
            console.error(error)
        })
        expect(modeloDB).toEqual(modeloInput)
    })
    test("Should post modelo motor", async () => {
        request("http://localhost:5000/resources/motor", "post", motorInput)
        await delay(100)
        const motorDB = await db.oneOrNone("SELECT marca, modelo FROM motor_cadastrado WHERE modelo = 'teste' AND marca = 'teste'").catch((error) => {
            console.error(error)
        })
        expect(motorDB).toEqual(motorInput)
    })
    test("Should post item charter", async () => {
        request("http://localhost:5000/resources/charter/item-charter", "post", itemCharter)
        await delay(100)
        const itemCharterDB = await db.oneOrNone("SELECT item, item_lazer FROM item_charter WHERE item = 'teste'").catch((error) => {
            console.error(error)
        })
        const itemCharterFormated = {
            item: itemCharterDB.item,
            itemLazer: itemCharterDB.item_lazer
        }
        expect(itemCharterFormated).toEqual(itemCharter)
    })
    test("Should post item seminovo", async () => {
        request("http://localhost:5000/resources/seminovo/item-seminovo", "post", itemSeminovo)
        await delay(100)
        const itemSeminovoDB = await db.oneOrNone("SELECT item FROM item_seminovo WHERE item = 'teste'").catch((error) => {
            console.error(error)
        })
        expect(itemSeminovoDB).toEqual(itemSeminovo)
    })
    test("Should post proprietario", async () => {
        request("http://localhost:5000/resources/proprietario", "post", proprietario)
        await delay(100)
        const proprietarioDB = await db.oneOrNone("SELECT nome, email, telefone FROM proprietario WHERE id = 1").catch((error) => {
            console.error(error)
        })
        expect(proprietarioDB).toEqual(proprietario)
    })
    test("Should get proprietario", async () => {
        const response = await request("http://localhost:5000/resources/proprietario/1", "GET")
        await delay(100)
        expect(response.data).toEqual(proprietarioWithId)
    })

    test("Should update proprietario", async () => {
        const proprietarioUpdate = {...proprietarioWithId}
        proprietarioUpdate.nome = "João Gabriel"
        proprietarioUpdate.email = "jg.7651@gmail.com"
        proprietarioUpdate.telefone = "21 960183131"
        request("http://localhost:5000/resources/proprietario", "PATCH", proprietarioUpdate)
        await delay(100)
        const response = await request("http://localhost:5000/resources/proprietario/1", "GET")
        expect(response.data).toEqual(proprietarioUpdate)
    })

    test("Should delete proprietario", async () => {
        await request("http://localhost:5000/resources/proprietario", "DELETE", {id:1})
        await delay(100)
        await expect(
           resourcesService.getProprietario(1)
        ).rejects.toMatchObject({
            statusCode: 404,
            message: expect.stringContaining("proprietario não encontrado: id=1"),
        });
    })
})