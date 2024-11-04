import { PrecoDto } from "../dto/PrecoDto.ts";
import { MoedaRepository } from "../repository/MoedaRepository.ts";
import { PrecoRepository } from "../repository/PrecoRepository.ts";
import { Preco } from "../types/Preco.ts";

export class PrecoModel {
    constructor() {

    }
    buildPrecoDtoFromDatabase(input: Record<string, any>) {
        const valorFloat =  parseFloat(input.preco)
        const precoDto = new PrecoDto(input.moeda_simbolo,valorFloat)
        return precoDto
    }
    buildPrecoDtoFromClient() {
        
    }
    async savePreco(preco:Preco, precoRepo:PrecoRepository, moedaRepo: MoedaRepository){
        const idMoeda = await moedaRepo.getIdMoedaBySimbolo(preco.moeda)
        const idPrecoSaved = await precoRepo.insertPreco(preco.valor, idMoeda.id)
        return idPrecoSaved.id
    }
}