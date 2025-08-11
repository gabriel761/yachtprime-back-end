import { afterAll, beforeAll, expect, test, describe, vi } from "vitest";
import { NextFunction, Request, Response } from 'express';
import { FirebaseModel } from "../models/external/FirebaseModel.ts";
import axios, { AxiosRequestConfig } from 'axios'
import { TestDatabase } from "../infra/TestDatabase.ts";
import barcoCharterOutput from "./mocks/barcoCharterOutput.ts";
import barcoCharterInput from "./mocks/barcoCharterInput.ts"
import barcoCharterOutputUpdate from "./mocks/barcoCharterInputUpdate.ts";
import { barcoCharterDashboardList } from "./mocks/barcoCharterDashboardList.ts";
import { BarcoCharterService } from "../service/BarcoCharterService.ts";
import { BarcoCharterRepository } from "../repository/charter/BarcoCharterRepository.ts";
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.ts";
import { ImagemRepository } from "../repository/ImagemRepository.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { ConsumoCombustivelRepo } from "../repository/charter/ConsumoCombustivelRepo.ts";
import { TaxaChurrascoRepository } from "../repository/charter/TaxaChurrascoRepo.ts";
import { RoteiroRepository } from "../repository/charter/RoteiroRepository.ts";

const barcoCharterRepository = new BarcoCharterRepository()
const itensCharterRepo = new ItensCharterRepository()
const imagemRepository = new ImagemRepository()
const precoRepository = new PrecoRepository()
const consumoCombustivelRepository = new ConsumoCombustivelRepo()
const taxaChurrascoRepo = new TaxaChurrascoRepository()
const passageirosRepo = new TaxaChurrascoRepository()
const roteiroRepository = new RoteiroRepository()



const deleteImageMock = vi.fn();
const firebaseModelMock = new FirebaseModel();
firebaseModelMock.deleteImage = deleteImageMock;

// mockRequest.ts
export const mockRequest = (body = {}, params = {}, query = {}) => {
    return {
        body: body,
        params: params,
        query: query,
        headers: {},
        method: 'POST',
        url: '/barco/seminovo',
    } as unknown as Request;
};

// mockResponse.ts
export const mockResponse = () => {
    const res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis(),
        end: vi.fn().mockReturnThis(),
        // Adicione outros métodos conforme necessário
    } as unknown as Response;
    return res;
};




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

describe("Barco charter and resources tests", () => {
    test.skip("Should get full barco charter",  async () => {
        const response = await request("http://localhost:5000/barco/charter/1", "get")
        expect(response.data).toEqual(barcoCharterOutput)
    })
    test("Should post full barco charter", async () => {
        await request("http://localhost:5000/barco/charter", "POST", barcoCharterInput)
        delay(2000)
        const response = await request("http://localhost:5000/barco/charter/1", "get")
        expect(response.data).toEqual(barcoCharterOutput)
    })
    test("Should get charter list for dashboard website", async () => {
        const response = await request("http://localhost:5000/barco/charter/list/dashboard", "get")
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.data).toEqual(
            expect.arrayContaining(barcoCharterDashboardList)
        )
    })
    test("Should update barco charter", async () => {
        const barcoCharterUpdate = {...barcoCharterOutputUpdate}
        barcoCharterUpdate.ano = 2019
        barcoCharterUpdate.passageiros.passageiros = 12
        barcoCharterUpdate.consumoCombustivel.litrosHora = 40
        barcoCharterUpdate.cidade = "Rio de Janeiro"
        await request("http://localhost:5000/barco/charter", "PATCH", barcoCharterUpdate)
        delay(2000)
        const response = await request("http://localhost:5000/barco/charter/1", "get")
        expect(response.data).toEqual(barcoCharterUpdate)
    })
    test("Should delete barcoCharter successfully", async () => {
        const barcoSeminovoService = new BarcoCharterService()
        await barcoSeminovoService.deleteBarcoCharter(1, firebaseModelMock)


        await expect(barcoCharterRepository.getBarcoCharter(1)).rejects.toThrow("barco não existe: id=1");
        await expect(precoRepository.getPrecoById(1)).rejects.toThrow("Não há preco com o id 1")
        await expect(imagemRepository.getImagensByIdSeminovo(1)).rejects.toThrow("Não há imagens associadas a este seminovo")
        // await expect(itensCharterRepo.getItensCharterByIdCharter(1)).rejects.toThrow("Não foram encontrados itens associados a este charter idCharter=1")

    })
})
