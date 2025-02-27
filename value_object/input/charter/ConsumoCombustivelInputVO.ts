import { CustomError } from "../../../infra/CustoError.js";
import { ConsumoCombustivel } from "../../../types/charter/ConsumoCombustivel.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { Combustivel } from "../../../types/Combustivel.js";
import { validateIntegerPositiveNumber } from "../../../util/validationUtil.js";

export class ConsumoCombustivelInputVO {
    private litrosHora!: number;
    private precoHora!: PrecoOutput;
    private tipoCombustivel!: Combustivel;

    constructor() { }

    setLitrosHora(litrosHora: number) {
        validateIntegerPositiveNumber(litrosHora, "litroHora", "ConsumoCombustivel")
        this.litrosHora = litrosHora;
    }

    setPrecoHora(precoHora: PrecoOutput) {
        if (!precoHora) {
            throw new CustomError("Preço por hora em consumo de combustível é inválido", 400);
        }
        this.precoHora = precoHora;
    }

    setTipoCombustivel(tipoCombustivel: Combustivel) {
        if (!tipoCombustivel) {
            throw new CustomError("Tipo de combustível em consumo de combustível é inválido", 400);
        }
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
