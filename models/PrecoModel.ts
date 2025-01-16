
import { MoedaRepository } from "../repository/MoedaRepository.js";
import { PrecoRepository } from "../repository/PrecoRepository.js";
import { Moeda } from "../types/Moeda.js";
import { PrecoInput, PrecoOutput } from "../types/Preco.js";
import { converterPrecoBrasilParaEUA, converterPrecoEUAParaBrasil } from "../util/transformationUtil.js";
import { PrecoInputVO } from "../value_object/input/PrecoInputVO.js";
import { PrecoOutputVO } from "../value_object/output/PrecoOutputVO.js";


type PrecoDatabase = {
    preco: string
    moeda_simbolo: string
}
export class PrecoModel {
    constructor() {

    }
    buildPrecoDtoFromDatabase(input: PrecoDatabase):PrecoOutput {
        
        const  precoOutputVO = new PrecoOutputVO()
        precoOutputVO.setValor(input.preco)
        precoOutputVO.setMoeda(input.moeda_simbolo)
        return precoOutputVO.extractData()
    }
    async savePreco(preco:PrecoInput, precoRepo:PrecoRepository, moedaRepo: MoedaRepository){
        const idMoeda = await moedaRepo.getIdMoedaBySimbolo(preco.moeda)
        const idPrecoSaved = await precoRepo.insertPreco(preco.valor, idMoeda.id)
        return idPrecoSaved.id
    }
    async updatePreco(preco: PrecoInput, idPreco: number, precoRepo: PrecoRepository, moedaRepo: MoedaRepository) {
        
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