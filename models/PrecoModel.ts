import { PrecoDto } from "../dto/PrecoDto.ts";
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
}