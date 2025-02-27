import { CustomError } from "../../../infra/CustoError.js";
import { TaxaChurrasco } from "../../../types/charter/TaxaChurrasco.js";
import { PrecoOutput } from "../../../types/Preco.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";


export class TaxaChurrascoInputVO {
    private id!: number;
    private preco!: PrecoOutput;
    private mensagem!: string;

    constructor() { }

    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "TaxaChurrasco")
        this.id = id;
    }

    setPreco(preco: PrecoOutput) {
        if (!preco || typeof preco !== "object") {
            throw new CustomError("Preço inválido", 400);
        }
        this.preco = preco;
    }

    setMensagem(mensagem: string) {
        validateString(mensagem, "Mensagem", "TaxaChurrasco")
        this.mensagem = mensagem;
    }

    extractData(): TaxaChurrasco {
        return {
            id: this.id,
            preco: this.preco,
            mensagem: this.mensagem
        };
    }
}
