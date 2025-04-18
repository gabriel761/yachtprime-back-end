import { CustomError } from "../../infra/CustoError.js";
import db from "../../infra/database.js";
import { ConsumoCombustivelInput } from "../../types/charter/ConsumoCombustivel.js";

export class ConsumoCombustivelRepo {

    async getIdPrecoCombustivelByIdConsumo (idConsumo: number | undefined){
        const result = await db.one("SELECT id_preco_hora FROM consumo_combustivel WHERE id=$1", [idConsumo])
        .catch ((error) => {
            throw new CustomError(`Repository lever Error: ConsumoCombustivelRepository getIdPrecoCombustivelByIdConsumo: ${error}`, 500);
        });

        return result.id_preco_hora
      
    }

    async insertComsumoCombustivel(consumoCombustivel: ConsumoCombustivelInput, idPrecoHora:number, idTipoCombustivel:number) {
       const idConsumoCombustivel = await  db.one("INSERT INTO consumo_combustivel (litros_hora, id_preco_hora, id_tipo_combustivel) VALUES ($1,$2,$3) RETURNING id", [consumoCombustivel.litrosHora, idPrecoHora, idTipoCombustivel]).catch((error) => {
            throw new CustomError(`Repository lever Error: ConsumoCombustivelRepository insertComsumoCombustivel: ${error}`, 500);
        });
        return idConsumoCombustivel.id
    }

    async updateComsumoCombustivel(consumoCombustivel: ConsumoCombustivelInput, idTipoCombustivel: number, idConsumoCombustivel:number) {
         await db.none("UPDATE consumo_combustivel SET litros_hora=$1, id_tipo_combustivel=$2 WHERE id=$3", [consumoCombustivel.litrosHora, idTipoCombustivel, idConsumoCombustivel]).catch((error) => {
            throw new CustomError(`Repository lever Error: ConsumoCombustivelRepository updateComsumoCombustivel: ${error}`, 500);
        });
        
    }
}