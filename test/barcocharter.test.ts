import { afterAll, beforeAll, expect, test, describe, vi } from "vitest";
import { NextFunction, Request, Response } from 'express';
import { FirebaseModel } from "../models/external/FirebaseModel.ts";
import axios, { AxiosRequestConfig } from 'axios'
import { TestDatabase } from "../infra/TestDatabase.ts";
import barcoCharterOutput from "./mocks/barcoCharterOutput.ts";
import barcoCharterInput from "./mocks/barcoCharterInput.ts"
import barcoCharterOutputUpdate from "./mocks/barcoCharterUpdate.ts";
import { barcoCharterDashboardList } from "./mocks/barcoCharterDashboardList.ts";
import { BarcoCharterService } from "../service/BarcoCharterService.ts";
import { BarcoCharterRepository } from "../repository/charter/BarcoCharterRepository.ts";
import { ItensCharterRepository } from "../repository/charter/ItensCharterRepository.ts";
import { ImagemRepository } from "../repository/ImagemRepository.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { ConsumoCombustivelRepo } from "../repository/charter/ConsumoCombustivelRepo.ts";
import { TaxaChurrascoRepository } from "../repository/charter/TaxaChurrascoRepo.ts";
import { RoteiroRepository } from "../repository/charter/RoteiroRepository.ts";
import barcoCharterOutputDashboard from "./mocks/barcoCharterOutputDashboard.ts";
import { ProprietarioRepository } from "../repository/ProprietarioRepository.ts";
import db from "../infra/database.ts";
import { UUID_REGEX } from "../util/variables.ts";
import { BarcoCharterListDashboard, BarcoCharterListDashboardWithId } from "../types/charter/BarcoCharter.ts";
import { CondicoesRepository } from "../repository/charter/CondicoesRepository.ts";

const barcoCharterRepository = new BarcoCharterRepository()
const itensCharterRepo = new ItensCharterRepository()
const imagemRepository = new ImagemRepository()
const precoRepository = new PrecoRepository()
const condicoesRepository = new CondicoesRepository()



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
    test.skip("Should get full barco charter", async () => {
        const response = await request("http://localhost:5000/barco/charter/1", "get")
        expect(response.data).toEqual(barcoCharterOutput)
    })
    test.skip("Should get full barco charter dashboard version", async () => {
        const response = await request("http://localhost:5000/barco/charter/dashboard/1", "get")
        expect(response.data).toEqual(barcoCharterOutputDashboard)
    })
    test.only("Should post full barco charter", async () => {
        await request("http://localhost:5000/barco/charter", "POST", barcoCharterInput)
        const uuid = await db.query("SELECT codigo FROM barco_charter LIMIT 1").then(res => res[0].codigo)
        const response = await request("http://localhost:5000/barco/charter/" + uuid, "get")
        const { id, codigo, ...rest } = response.data
        expect(id).toBe(1)
        expect(codigo).toMatch(UUID_REGEX)
        expect(rest).toEqual(barcoCharterOutput)
    })
    test("Should get charter list for dashboard website", async () => {
        const response = await request("http://localhost:5000/barco/charter/list/dashboard", "get")
        const barcosResponse = response.data as BarcoCharterListDashboardWithId[]
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        barcosResponse.forEach((item, index) => {
            const { id, ...rest } = item;

            expect(id).toMatch(UUID_REGEX);
            expect(rest).toEqual(barcoCharterDashboardList[index]);
        });
    })
    test("Should update barco charter", async () => {
        const uuid = await db.query("SELECT codigo FROM barco_charter LIMIT 1").then(res => res[0].codigo)
        const barcoCharterUpdate = { id: uuid, ...barcoCharterOutputUpdate }
        barcoCharterUpdate.ano = 2019
        barcoCharterUpdate.passageiros.passageiros = 12
        barcoCharterUpdate.consumoCombustivel.litrosHora = 40
        barcoCharterUpdate.cidade = "Rio de Janeiro"
        barcoCharterUpdate.proprietario.nome = "João Gabriel"
        barcoCharterUpdate.proprietario.id = 2
        await db.query("INSERT INTO proprietario (id, nome, email, telefone) VALUES($1,$2,$3, $4)", [barcoCharterUpdate.proprietario.id, barcoCharterUpdate.proprietario.nome, barcoCharterUpdate.proprietario.email, barcoCharterUpdate.proprietario.telefone])
        await request("http://localhost:5000/barco/charter", "PATCH", barcoCharterUpdate)
        const response = await request("http://localhost:5000/barco/charter/dashboard/" + uuid, "get")

        const { condicoes: expectedCondicoes, ...expectedRest } = barcoCharterUpdate;
        const { condicoes: actualCondicoes, ...actualRest } = response.data;

        expect(actualRest).toEqual(expectedRest);

        expect(actualCondicoes.length).toBe(expectedCondicoes.length);
        const actualOpcoes = actualCondicoes.map((c: any) => c.opcao).sort();
        const expectedOpcoes = expectedCondicoes.map((c: any) => c.opcao).sort();
        expect(actualOpcoes).toEqual(expectedOpcoes);
    })
    test("Should delete barcoCharter successfully", async () => {
        const uuid = await db.query("SELECT codigo FROM barco_charter LIMIT 1").then(res => res[0].codigo)
        const barcoSeminovoService = new BarcoCharterService()
        await barcoSeminovoService.deleteBarcoCharter(uuid, firebaseModelMock)
        await expect(barcoCharterRepository.getBarcoCharter(uuid)).rejects.toHaveProperty("statusCode", 404);
        await expect(precoRepository.getPrecoById(1)).rejects.toThrow("Não há preco com o id 1")
        await expect(imagemRepository.getImagensByIdSeminovo(1)).rejects.toThrow("Não há imagens associadas a este seminovo")
        await expect(itensCharterRepo.getItensCharterByIdCharter(1)).rejects.toHaveProperty("statusCode", 404);
        await expect(condicoesRepository.getCondicoesByIdCharter(1)).rejects.toHaveProperty("statusCode", 404);
    })
})
