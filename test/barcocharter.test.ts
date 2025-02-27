import { afterAll, beforeAll, expect, test, describe, vi } from "vitest";
import { NextFunction, Request, Response } from 'express';
import { FirebaseModel } from "../models/external/FirebaseModel.ts";
import axios, { AxiosRequestConfig } from 'axios'
import { TestDatabase } from "../infra/TestDatabase.ts";
import barcoCharterOutput from "./mocks/barcoCharterOutput.ts";

// const barcoSeminovoRepository = new BarcoSeminovoRepository()
// const cabineRepository = new CabineRepository()
// const imagemRepository = new ImagemRepository()
// const precoRepository = new PrecoRepository()
// const motorizacaoRepository = new MotorizacaoRepository()
// const itemSeminovoRepository = new ItemSeminovoRepository()

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

// beforeAll(async () => {
//     const testDatabase = new TestDatabase()
//     await testDatabase.resetDbToInitialState()
// })
// afterAll(async () => {
//     const testDatabase = new TestDatabase()
//     await testDatabase.resetDbToInitialState()
// })

describe("Barco seminovo and resources tests", () => {
    test.only("Should get full barco charter",  async () => {
        const response = await request("http://localhost:5000/barco/charter/1", "get")
        expect(response.data).toEqual(barcoCharterOutput)
    })
})