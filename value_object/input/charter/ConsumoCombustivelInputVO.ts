import { CustomError } from "../../../infra/CustoError.js";
import { ConsumoCombustivelInput } from "../../../types/charter/ConsumoCombustivel.js";
import { PrecoInput, PrecoOutput } from "../../../types/Preco.js";
import { Combustivel } from "../../../types/Combustivel.js";
import { validateIntegerPositiveNumber } from "../../../util/validationUtil.js";

export class ConsumoCombustivelInputVO {
    private id?: number;
    private litrosHora!: number;
    private precoHora!: PrecoInput;
    private tipoCombustivel!: Combustivel;

    constructor() { }


    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "Combustivel")
        this.id = id
    }
    setLitrosHora(litrosHora: number) {
        validateIntegerPositiveNumber(litrosHora, "litroHora", "ConsumoCombustivel")
        this.litrosHora = litrosHora;
    }

    setPrecoHora(precoHora: PrecoInput) {
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

    extractData(): ConsumoCombustivelInput {
        return {
            id: this.id,
            litrosHora: this.litrosHora,
            precoHora: this.precoHora,
            tipoCombustivel: this.tipoCombustivel
        };
    }
}
