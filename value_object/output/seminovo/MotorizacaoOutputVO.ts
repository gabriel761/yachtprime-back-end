import { Motorizacao } from "../../../types/seminovo/Motorizacao.js"


export class MotorizacaoOutputVO {
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
        this.modelo = modelo
    }
    setQuantidade(quantidade: number) {
        this.quantidade = quantidade
    }
    setPotencia(potencia: number) {
        this.potencia = potencia
    }
    setHoras(horas: number) {
        this.horas = horas
    }
    setAno(ano: number) {
        this.ano = ano
    }
    setObservacoes(observacoes?: string | null) {
        if (!observacoes) {
            observacoes = null
        }
        this.observacoes = observacoes
    }
    setId(id?:number){
        this.id = id
    }
    extractData():Motorizacao{
        return{
            id: this.id,
            modelo:this.modelo,
            quantidade: this.quantidade,
            potencia: this.potencia,
            horas: this.horas,
            ano: this.ano,
            observacoes: this.observacoes
        }
    }
}