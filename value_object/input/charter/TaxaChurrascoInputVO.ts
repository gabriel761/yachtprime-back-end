import { CustomError } from "../../../infra/CustoError.js";
import { TaxaChurrascoInput } from "../../../types/charter/TaxaChurrasco.js";
import {  PrecoInput } from "../../../types/Preco.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";


export class TaxaChurrascoInputVO {
    private id?:number;
    private preco!: PrecoInput;
    private mensagem!: string;

    constructor() { }

   
    setId(id: number){
        validateIntegerPositiveNumber(id, "id", "TaxaChurrascoInputVO")
        this.id = id
    }

    setPreco(preco: PrecoInput) {
        if (!preco || typeof preco !== "object") {
            throw new CustomError("Preço inválido", 400);
        }
        this.preco = preco;
    }

    setMensagem(mensagem: string) {
        validateString(mensagem, "Mensagem", "TaxaChurrasco")
        this.mensagem = mensagem;
    }

    extractData(): TaxaChurrascoInput {
        return {
            id: this.id,
            preco: this.preco,
            mensagem: this.mensagem
        };
    }
}
