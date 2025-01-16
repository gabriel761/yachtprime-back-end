import { CustomError } from "../infra/CustoError.js";

export const convertStringToBoolean = (string: any) =>{
    return string === 'true' ? true : string === 'false' ? false : undefined
}

export function converterPrecoBrasilParaEUA(precoBrasil:string | number) {
    if(typeof precoBrasil == "string"){
        const precoNumerico = parseFloat(precoBrasil.replace('R$', '').replaceAll('.', '').replace(',', '.'));
        return precoNumerico;
    }
    return precoBrasil
}

export function converterPrecoEUAParaBrasil(precoEUA: string): string {
    // Converte a string para número
    const precoNumerico = parseFloat(precoEUA);

    // Verifica se a conversão foi bem-sucedida
    if (isNaN(precoNumerico)) {
        throw new CustomError('transformationUtil: Erro convertendo preço de Brasil para EUA. O preço fornecido não é um número válido.', 500);
    }

    // Formata o número para o padrão brasileiro
    const precoFormatado = precoNumerico
        .toFixed(2) // Define duas casas decimais
        .replace('.', ',') // Substitui o ponto pelo separador decimal brasileiro
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona os pontos como separadores de milhar

    return `${precoFormatado}`;
}