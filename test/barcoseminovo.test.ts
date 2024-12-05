import { afterAll, beforeAll, expect, test, describe, vi } from "vitest";
import { NextFunction, Request, Response } from 'express';
import barcoSeminovoOutput from "./mocks/barcoSeminovoOutput.ts";
import barcoSeminovoInput from "./mocks/barcoSeminovoOutput.ts";
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
import { BarcoSeminovoInput } from "../types/BarcoSeminovo.ts";
import BarcoSeminovoRepository from "../repository/BarcoSeminovoRepository.ts";
import { CabineRepository } from "../repository/CabineRepository.ts";
import { ImagemRepository } from "../repository/ImagemRepository.ts";
import { MotorizacaoRepository } from "../repository/MotorizacaoRepository.ts";
import { ImagemModel } from "../models/ImagemModel.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { ItemSeminovoRepository } from "../repository/ItemSeminovoRepository.ts";

const barcoSeminovoRepository = new BarcoSeminovoRepository()
const cabineRepository = new CabineRepository()
const imagemRepository = new ImagemRepository()
const precoRepository = new PrecoRepository()
const motorizacaoRepository = new MotorizacaoRepository()
const itemSeminovoRepository = new ItemSeminovoRepository()

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
    test("Should delete barcoSeminovo successfully", async () => {
        const barcoSeminovoService = new BarcoSeminovoService()
        await barcoSeminovoService.deleteBarcoSeminovo(1, firebaseModelMock)
        
        
        await expect(barcoSeminovoRepository.getBarcoSeminovo(1)).rejects.toThrow("barco não existe: id=1");
        await expect(motorizacaoRepository.getMotorizacaoById(1)).rejects.toThrow("Não há motorizacao com o id 1")
        await expect(precoRepository.getPrecoById(1)).rejects.toThrow("Não há preco com o id 1")
        await expect(imagemRepository.getImagensByIdSeminovo(1)).rejects.toThrow("Não há imagens associadas a este seminovo")
        await expect(cabineRepository.getCabineById(1)).rejects.toThrow("Cabine não encontrada idCabine=1")
        await expect(itemSeminovoRepository.getItensSeminovoByIdSeminovo(1)).rejects.toThrow("Não foram encontrados itens associados a este seminovo idSeminovo=1")

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
                expect.objectContaining({ id: 1, item: "Adega para vinhos" }),
                expect.objectContaining({ id: 2, item: "Alfa Laval" }),
            ])
        );
    })
})



