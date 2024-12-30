
import { MoedaRepository } from "../repository/MoedaRepository.js";
import { PrecoRepository } from "../repository/PrecoRepository.js";
import { Moeda } from "../types/Moeda.js";
import { Preco } from "../types/Preco.js";
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.js";


type PrecoDatabase = {
    preco: string
    moeda_simbolo: string
}
export class PrecoModel {
    constructor() {

    }
    buildPrecoDtoFromDatabase(input: PrecoDatabase):Preco {
        const valorFloat =  parseFloat(input.preco)
        const  precoInputVO = new PrecoInputVO()
        precoInputVO.setValor(valorFloat)
        precoInputVO.setMoeda(input.moeda_simbolo)
        return precoInputVO.extractData()
    }
    async savePreco(preco:Preco, precoRepo:PrecoRepository, moedaRepo: MoedaRepository){
        const idMoeda = await moedaRepo.getIdMoedaBySimbolo(preco.moeda)
        const idPrecoSaved = await precoRepo.insertPreco(preco.valor, idMoeda.id)
        return idPrecoSaved.id
    }
    async updatePreco(preco: Preco, idPreco: number, precoRepo: PrecoRepository, moedaRepo: MoedaRepository) {
        const idMoeda = await moedaRepo.getIdMoedaBySimbolo(preco.moeda)
        await precoRepo.updatePreco(preco.valor, idMoeda.id, idPreco)
    }
    async deletePrecoByidPreco(idPreco: number, precoRepository: PrecoRepository){
        await precoRepository.deletePrecoById(idPreco)
    }
    async listMoeda(moedaRepository: MoedaRepository):Promise<Moeda[]>{
       const moedaListDatabase =  await moedaRepository.listMoeda()
       const moedaList = moedaListDatabase.map((moeda):Moeda=> {
        return {id: moeda.id, nome: moeda.nome, simbolo: moeda.simbolo, codigoBancario: moeda.codigo_bancario}
       })
       return moedaList
    }
}