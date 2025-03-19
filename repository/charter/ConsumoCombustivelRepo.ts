import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { ConsumoCombustivelInput } from "../../types/charter/ConsumoCombustivel.js";

export class ConsumoCombustivelRepo {
    async insertComsumoCombustivel(consumoCombustivel: ConsumoCombustivelInput, idPrecoHora:number, idTipoCombustivel:number) {
       const idConsumoCombustivel = await  db.one("INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel) VALUES ($1,$2,$3) RETURNING id", [consumoCombustivel.litrosHora, idPrecoHora, idTipoCombustivel]).catch((error) => {
            throw new CustomError(`Repository lever Error: ConsumoCombustivelRepository insertComsumoCombustivel: ${error}`, 500);
        });
        return idConsumoCombustivel.id
    }
}