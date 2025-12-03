import { BarcoSeminovoInput } from '../../types/seminovo/BarcoSeminovo.ts'

const barcoSeminovoInput: BarcoSeminovoInput= {
    modelo: "Altamar 50",
    nome: "Sea View",
    ativo: true,
    ano: 2016,
    tamanho: 50,
    motorizacao: {
        modelo: "Detroit 8VF92 - 735HP - Diesel",
        quantidade: 2,
        potencia: 1400,
        horas: 150,
        ano: 2016,
        observacoes: null
    },
    potenciaTotal: 2800,
    combustivel: {
        id: 1,
        opcao: "Gasolina"
    },
    propulsao: {
        id: 3,
        opcao: "Rabeta"
    },
    proprietario: {
        nome: "Alice Almeida",
        email: "alice.almeida@gmail.com",
        telefone: "+55 21 98391-7378"
    },
    cabines: {
        passageiros: 5,
        tripulacao: 1
    },
    procedencia: "Brasil",
    destaque: "Guardado no seco por 212 horas",
    preco: {
        moeda: "$",
        valor: 5000000.00
    },
    imagens: [
        {
            link: "https://mariattinavalbroker.com/wp-content/uploads/slider/cache/8caa1856fcad21de1ddd3bba95dfcb7d/4-1.jpg",
            fileName: "file-1"
        },
        {
            link: "https://www.leobroker.com.br/Seminovo/20231205164521-1520x855.jpg?format=webp&width=1520&height=855",
            fileName: "file-2"
        },
        {
            link: "https://www.leobroker.com.br/Seminovo/20231025152927-20230712_110144.jpg?format=webp&width=530&height=298",
            fileName: "file-3"
        },
        {
            link: "https://mariattinavalbroker.com/wp-content/uploads/slider/cache/3c93ae14c6c04f09cb9148b6dbc868d5/7-1.jpg",
            fileName: "file-4"
        },
        {
            link: "https://orionyachts.com.br/wp-content/uploads/2020/04/8660cc1b-1205-49de-8804-a91b42e568e6-1024x768.jpg",
            fileName: "file-5"
        }
    ],
    equipadoCom: [
        { id: 3, item: "Alto-falante(s) marinizado", quantidade: 1 },
        { id: 6, item: "Ancoragem via GPS (skyhook)", quantidade: 2 },
        { id: 7, item: "Antena de internet", quantidade: 4 },
        { id: 8, item: "Antena de TV (normal)", quantidade: 5 },
        { id: 9, item: "Antena SKY", quantidade: 1 },
        { id: 10, item: "Ar condicionado (máquinas)", quantidade: 2 },
        { id: 12, item: "Ar condicionado no cockpit (saída)", quantidade: 2 },
        { id: 14, item: "Balsa de sobrevivência", quantidade: 3 },
        { id: 15, item: "Baterias de serviço", quantidade: 2 },
    ],
    videoPromocional: undefined,
    oportunidade: true
}

export default barcoSeminovoInput