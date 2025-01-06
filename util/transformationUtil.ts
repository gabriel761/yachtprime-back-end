export const convertStringToBoolean = (string: any) =>{
    return string === 'true' ? true : string === 'false' ? false : undefined
}

export function converterPrecoBrasilParaEUA(precoBrasil:string) {
    const precoNumerico = parseFloat(precoBrasil.replace('R$', '').replace('.', '').replace(',', '.'));
    return precoNumerico.toFixed(2);
}