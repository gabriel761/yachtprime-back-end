import {expect, test} from "vitest";
import barcoSeminovo from "./mocks/barco_seminovo.ts";
import axios,{AxiosRequestConfig} from 'axios'

function request(url:string, method:string, data?:any){
   return axios({url,method, data} as AxiosRequestConfig)
}

test("Should get full seminovo object with data from database", async () => {
    const response = await request("http://localhost:5000/barco/seminovo/1", "get")
    expect(response.data).toEqual(barcoSeminovo)
})