import { CustomError } from "../../../infra/CustoError.js";
import { ConsumoCombustivel } from "../../../types/charter/ConsumoCombustivel.js";
import { PrecoOutput } from "../../../types/Preco.js";

export class ConsumoCombustivelOutputVO {
    private litrosHora!: number;
    private precoHora!: PrecoOutput;
    private tipoCombustivel!: string;

    constructor() { }

    setLitrosHora(litrosHora: number) {
        this.litrosHora = litrosHora;
    }

    setPrecoHora(precoHora: PrecoOutput) {
        this.precoHora = precoHora;
    }

    setTipoCombustivel(tipoCombustivel: string) {
        this.tipoCombustivel = tipoCombustivel;
    }

    extractData(): ConsumoCombustivel {
        return {
            litrosHora: this.litrosHora,
            precoHora: this.precoHora,
            tipoCombustivel: this.tipoCombustivel
        };
    }
}
