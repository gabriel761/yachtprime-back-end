import DtoSeminovo from '../../dto/DtoSeminovo.js'

const motor = {
    modelo: "Detroit 8VF92 - 735HP - Diesel",
    quantidade: 2,
    potencia: 1400,
    horas: 150,
    ano: 2016,
    observacoes: null
}
const cabines = {
    passageiros: 5,
    tripulacao: 1
}
const preco = {
    moeda: "Dólar",
    valor: 5000000.00
}
const imagens = [
    "https://mariattinavalbroker.com/wp-content/uploads/slider/cache/8caa1856fcad21de1ddd3bba95dfcb7d/4-1.jpg",
    "https://www.leobroker.com.br/Seminovo/20231205164521-1520x855.jpg?format=webp&width=1520&height=855",
    "https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298",
    "https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg",
    "https://orionyachts.com.br/wp-content/uploads/2020/04/8660cc1b-1205-49de-8804-a91b42e568e6-1024x768.jpg"
]

const equipadoCom = [
    { item: "Alto-falante(s) marinizado", quantidade: 1},
    { item: "Ancoragem via GPS (skyhook)", quantidade: 2 },
    { item: "Antena de internet", quantidade: 4 },
    { item: "Antena de TV (normal)", quantidade: 5 },
    { item: "Antena SKY", quantidade: 1 },
    { item: "Ar condicionado (máquinas)", quantidade: 2 },
    { item: "Ar condicionado no cockpit (saída)", quantidade: 2 },
    { item: "Balsa de sobrevivência", quantidade: 3 },
    { item: "Baterias de serviço", quantidade: 2 },
]
const barcoSeminovo = new DtoSeminovo("Altamar 50", "Sea View", 2016, 50, motor, 2800, "Diesel", "Pé de galinha eixo direto", cabines, "Brasil", "Guardado no seco por 212 horas", preco, imagens, equipadoCom, null);

export default barcoSeminovo