import { CustomError } from "../../../infra/CustoError.js";
import { ConsumoCombustivelOutput } from "../../../types/charter/ConsumoCombustivel.js";
import { Combustivel } from "../../../types/Combustivel.js";
import { PrecoOutput } from "../../../types/Preco.js";

export class ConsumoCombustivelOutputVO {
    private litrosHora!: number;
    private precoHora!: PrecoOutput;
    private tipoCombustivel!: Combustivel

    constructor() { } 

    setLitrosHora(litrosHora: number) {
        this.litrosHora = litrosHora;
    }

    setPrecoHora(precoHora: PrecoOutput) {
        this.precoHora = precoHora;
    }

    setTipoCombustivel(tipoCombustivel: Combustivel) {
        this.tipoCombustivel = tipoCombustivel;
    }

    extractData(): ConsumoCombustivelOutput {
        return {
            litrosHora: this.litrosHora,
            precoHora: this.precoHora,
            tipoCombustivel: this.tipoCombustivel
        };
    }
}
