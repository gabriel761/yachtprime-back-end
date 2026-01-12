import { afterAll, beforeAll, expect, test, describe, vi } from "vitest";
import { NextFunction, Request, Response } from 'express';
import barcoSeminovoOutput from "./mocks/barcoSeminovoOutput.ts";
import barcoSeminovoInput from "./mocks/barcoSeminovoInput.ts";
import axios, { AxiosRequestConfig } from 'axios'
import { TestDatabase } from "../infra/TestDatabase.ts";
import { tipoCombustivelList } from "./mocks/tipoCombustivelList.ts";
import { tipoPropulsao } from "./mocks/tipoPropulsaoList.ts";
import { modelos } from "./mocks/modelos.ts";
import motores from "./mocks/motores.ts";
import moedas from "./mocks/moedas.ts";
import { FirebaseModel } from "../models/external/FirebaseModel.ts";
import BarcoSeminovoService from "../service/BarcoSeminovoService.ts";
import { CustomError } from "../infra/CustoError.ts";
import { BarcoSeminovoController } from "../controller/BarcoSeminovoController.ts";
import { BarcoSeminovoDashboardListWithId, BarcoSeminovoInput } from "../types/seminovo/BarcoSeminovo.ts";
import BarcoSeminovoRepository from "../repository/seminovo/BarcoSeminovoRepository.ts";
import { CabineRepository } from "../repository/seminovo/CabineRepository.ts";
import { ImagemRepository } from "../repository/ImagemRepository.ts";
import { MotorizacaoRepository } from "../repository/seminovo/MotorizacaoRepository.ts";
import { ImagemModel } from "../models/ImagemModel.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { ItemSeminovoRepository } from "../repository/seminovo/ItemSeminovoRepository.ts";
import barcoSeminovoFrontEndList from "./mocks/barcoSeminovoFrontEndList.ts";
import barcoSeminovoDashboardList from "./mocks/barcoSeminovoDashboardList.ts";
import barcoSeminovoDashboard from "./mocks/barcoSeminovoOutputDashboard.ts";
import { ProprietarioRepository } from "../repository/ProprietarioRepository.ts";
import db from "../infra/database.ts";
import { UUID_REGEX } from "../util/variables.ts";

const barcoSeminovoRepository = new BarcoSeminovoRepository()
const cabineRepository = new CabineRepository()
const imagemRepository = new ImagemRepository()
const precoRepository = new PrecoRepository()
const motorizacaoRepository = new MotorizacaoRepository()
const itemSeminovoRepository = new ItemSeminovoRepository()
const proprietarioRepository = new ProprietarioRepository()

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


describe("Barco seminovo and resources tests", () => {
    test.skip("Should get full barcoSeminovo object with data from database", async () => {
        const response = await request("http://localhost:5000/barco/seminovo/1", "get")
        expect(response.data).toEqual(barcoSeminovoOutput)
    })
    test.skip("Should get a response status of 404", async () => {
        const response = await fetch("http://localhost:5000/barco/seminovo/4c79611c-6604-4ec6-b2f6-e8abddc3e5f4", { method: "get" })
        expect(response.status).toBe(404)
    })
    test("Should post barcoSeminovo into database", async () => {
        await request("http://localhost:5000/barco/seminovo", "post", barcoSeminovoInput)
        const uuid = await db.query("SELECT codigo FROM barco_seminovo LIMIT 1").then(res => res[0].codigo)
        const response = await request("http://localhost:5000/barco/seminovo/dashboard/"+uuid, "get")
        const {id, codigo, ...rest} = response.data
        expect(rest).toEqual(barcoSeminovoDashboard)
        expect(id).toBe(1);
        expect(codigo).toMatch(UUID_REGEX)
    })
    test("Should get full barcoSeminovo object in dashboard version with data from database", async () => {
        const uuid = await db.query("SELECT codigo FROM barco_seminovo LIMIT 1").then(res => res[0].codigo)
        const response = await request("http://localhost:5000/barco/seminovo/dashboard/"+uuid, "get")
        const { id, codigo, ...rest } = response.data
        expect(rest).toEqual(barcoSeminovoDashboard)
        expect(id).toBe(1);
        expect(codigo).toMatch(UUID_REGEX)
    })
   
    test("Should update barcoSeminovo ", async () => {
        const uuid = await db.query("SELECT codigo FROM barco_seminovo LIMIT 1").then(res => res[0].codigo)
        const barcoSeminovoUpdate = {id: 1, codigo: uuid ,...barcoSeminovoDashboard }
        barcoSeminovoUpdate.nome = "Updated test"
        barcoSeminovoUpdate.preco.valor = "2.000,00"
        barcoSeminovoUpdate.cabines.passageiros = 1
        barcoSeminovoUpdate.motorizacao.ano = 2024
        barcoSeminovoUpdate.proprietario.nome = "João Gabriel"
        barcoSeminovoUpdate.proprietario.id = 2
        await db.query("INSERT INTO proprietario (id, nome, email, telefone) VALUES($1,$2,$3, $4)", [barcoSeminovoUpdate.proprietario.id ,barcoSeminovoUpdate.proprietario.nome, barcoSeminovoUpdate.proprietario.email, barcoSeminovoUpdate.proprietario.telefone])
        await request("http://localhost:5000/barco/seminovo", "PATCH", barcoSeminovoUpdate)
        const response = await request("http://localhost:5000/barco/seminovo/dashboard/"+uuid, "get")
        expect(response.data).toEqual(barcoSeminovoUpdate)
    })
   
    test("Should get seminovos list for front-end website", async () => {
        const response = await request("http://localhost:5000/barco/seminovo/list/front-end", "get")
        const barcosResponse = response.data.data as BarcoSeminovoDashboardListWithId[]
        expect(response.status).toBe(200);
        expect(response.data.data).toBeInstanceOf(Array);
        barcosResponse.forEach((item, index) => {
            const { codigo, ...rest } = item;

            expect(codigo).toMatch(UUID_REGEX)
            expect(rest).toEqual(barcoSeminovoFrontEndList[index]);
        });
    })
    test("Should get seminovos list for dashboard website", async () => {
        const response = await request("http://localhost:5000/barco/seminovo/list/dashboard", "get")
        const barcosResponse = response.data as BarcoSeminovoDashboardListWithId[]
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        barcosResponse.forEach((item, index) => {
            const {codigo, ...rest } = item;
            expect(codigo).toMatch(UUID_REGEX)
            expect(rest).toEqual(barcoSeminovoDashboardList[index]);
        });
    })
    test("Should delete barcoSeminovo successfully", async () => {
        const barcoSeminovoService = new BarcoSeminovoService()
        const uuid = await db.query("SELECT codigo FROM barco_seminovo LIMIT 1").then(res => res[0].codigo)
        await barcoSeminovoService.deleteBarcoSeminovo(uuid, firebaseModelMock)
        await expect(barcoSeminovoRepository.getBarcoSeminovo(uuid)).rejects.toHaveProperty("statusCode", 404);
        await expect(motorizacaoRepository.getMotorizacaoById(1)).rejects.toThrow("Não há motorizacao com o id 1")
        await expect(precoRepository.getPrecoById(1)).rejects.toThrow("Não há preco com o id 1")
        await expect(imagemRepository.getImagensByIdSeminovo(1)).rejects.toThrow("Não há imagens associadas a este seminovo")
        await expect(cabineRepository.getCabineById(1)).rejects.toThrow("Cabine não encontrada idCabine=1")
        await expect(itemSeminovoRepository.getItensSeminovoByIdSeminovo(1)).rejects.toHaveProperty("statusCode", 404);
    })
    
    test("Should delete images from firebase when fails", async () => {
        
        const barcoSeminovoServiceMock = {
            postBarcoSeminovo: vi.fn().mockRejectedValue(new Error('Failed to post barco seminovo')),
            rollbackPost: vi.fn().mockImplementation((barcoSeminovoInput: BarcoSeminovoInput) => {
                barcoSeminovoInput.imagens.forEach((imagem) => {
                    firebaseModelMock.deleteImage('seminovo', imagem.fileName);
                });
            }),
        };
        const req = mockRequest(barcoSeminovoInput);
        const res = mockResponse();
        const next = vi.fn();
        const barcoSeminovoController = new BarcoSeminovoController(barcoSeminovoServiceMock as any);
        await barcoSeminovoController.postBarcoSeminovo(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
        expect(barcoSeminovoServiceMock.rollbackPost).toHaveBeenCalledWith(barcoSeminovoInput);
        barcoSeminovoInput.imagens.forEach((imagem) => {
            expect(deleteImageMock).toHaveBeenCalledWith('seminovo', imagem.fileName);
        });
        
    })
    
    test("Should get tipo combustível list", async () => {
        const response = await request("http://localhost:5000/resources/seminovo/combustivel", "get")
        expect(response.data).toEqual(tipoCombustivelList)
    })
    test("Should get tipo propulsão list", async () => {
        const response = await request("http://localhost:5000/resources/seminovo/propulsao", "get")
        expect(response.data).toEqual(tipoPropulsao)
    })
    test("Should get modelo list", async () => {
        const response = await request("http://localhost:5000/resources/seminovo/modelo", "get")
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.data).toEqual(
            expect.arrayContaining(modelos)
        )
    })
    test("Should get motores list", async () => {
        const response = await request("http://localhost:5000/resources/seminovo/motor", "get")
        expect(response.status).toBe(200);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.data).toEqual(
            expect.arrayContaining(motores)
        )
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
                expect.objectContaining({ id: 1, item: "Adega para vinhos" }),
                expect.objectContaining({ id: 2, item: "Alfa Laval" }),
            ])
        );
    })
})



