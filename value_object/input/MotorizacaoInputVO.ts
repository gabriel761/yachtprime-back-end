import { CustomError } from "../../infra/CustoError.ts"
import { Motorizacao } from "../../types/Motorizacao.ts"
import { characterLimit, validateString } from "../../util/validationUtil.ts"

export class MotorizacaoInputVO {
    private id?: number
    private modelo!: string
    private quantidade!: number
    private potencia!: number
    private horas!: number
    private ano!: number
    private observacoes?: string | null
    constructor(

    ) {

    }
    setModelo(modelo: string) {
        validateString(modelo, "modelo", "motorização")
        characterLimit(modelo, "modelo", 100, "motorização")
        this.modelo = modelo
    }
    setQuantidade(quantidade: number) {
        if (!quantidade || quantidade < 0 || typeof quantidade != "number") throw new CustomError("Quantidade de motores é inválida", 403)
        this.quantidade = quantidade
    }
    setPotencia(potencia: number) {
        if (!potencia || potencia < 0 || typeof potencia != "number") throw new CustomError("Potência de motor é inválida", 403)
        this.potencia = potencia
    }
    setHoras(horas: number) {
        if (!horas || horas < 0 || typeof horas != "number") throw new CustomError("Horas de motor é inválida", 403)
        this.horas = horas
    }
    setAno(ano: number) {
        if (!ano || ano < 0 || typeof ano != "number") throw new CustomError("Ano de motor é inválido", 403)
        this.ano = ano
    }
    setObservacoes(observacoes?: string | null) {
        if (!observacoes) {
            observacoes = null
        } else {
            validateString(observacoes, "observações", "motorização")
            characterLimit(observacoes, "observações", 500, "motorização")
        }
        this.observacoes = observacoes
    }
    extractData(): Motorizacao {
        return {
            id: this.id,
            modelo: this.modelo,
            quantidade: this.quantidade,
            potencia: this.potencia,
            horas: this.horas,
            ano: this.ano,
            observacoes: this.observacoes
        }
    }
}