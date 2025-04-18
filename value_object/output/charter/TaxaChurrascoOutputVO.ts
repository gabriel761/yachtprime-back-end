import { CustomError } from "../../../infra/CustoError.js";
import { TaxaChurrascoOutput } from "../../../types/charter/TaxaChurrasco.js";
import { PrecoOutput } from "../../../types/Preco.js";


export class TaxaChurrascoOutputVO {
    private preco!: PrecoOutput;
    private mensagem!: string;

    constructor() { }

    setPreco(preco: PrecoOutput) {
        this.preco = preco;
    }

    setMensagem(mensagem: string) {
        this.mensagem = mensagem;
    }

    extractData(): TaxaChurrascoOutput {
        return {
            preco: this.preco,
            mensagem: this.mensagem
        };
    }
}
