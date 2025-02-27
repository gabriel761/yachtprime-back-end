import { CustomError } from "../../../infra/CustoError.js";
import { TaxaChurrasco } from "../../../types/charter/TaxaChurrasco.js";
import { PrecoOutput } from "../../../types/Preco.js";


export class TaxaChurrascoOutputVO {
    private id!: number;
    private preco!: PrecoOutput;
    private mensagem!: string;

    constructor() { }

    setId(id: number) {
        this.id = id;
    }

    setPreco(preco: PrecoOutput) {
        this.preco = preco;
    }

    setMensagem(mensagem: string) {
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
