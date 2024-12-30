import { CustomError } from "../../infra/CustoError.js"
import { Motorizacao } from "../../types/Motorizacao.js"
import { characterLimit, validateIntegerPositiveNumber, validateString, validateYear } from "../../util/validationUtil.js"

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
    setId(id?: number) {
        if (!!id) validateIntegerPositiveNumber(id, "id", "Motorização")
        this.id = id
    }
    setModelo(modelo: string) {
        validateString(modelo, "modelo", "motorização")
        characterLimit(modelo, "modelo", 100, "motorização")
        this.modelo = modelo
    }
    setQuantidade(quantidade: number) {
        validateIntegerPositiveNumber(quantidade, "Quantidate", "Motorização")
        this.quantidade = quantidade
    }
    setPotencia(potencia: number) {
        validateIntegerPositiveNumber(potencia, "Potência", "Motorização")
        this.potencia = potencia
    }
    setHoras(horas: number) {
        validateIntegerPositiveNumber(horas, "Horas", "Motorização")
        this.horas = horas
    }
    setAno(ano: number) {
        validateYear(ano, "Motorização")
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