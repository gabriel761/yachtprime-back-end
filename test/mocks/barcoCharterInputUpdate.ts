import { BarcoCharterOutput } from '../../types/charter/BarcoCharter.js'

const barcoCharterOutputUpdate: BarcoCharterOutput = {
    id: 1,
    modelo: "Ferretti 760",
    nome: "Barco Premium",
    ano: 2023,
    tamanho: 60,
    preco: { moeda: "R$", valor: "2.200,00" },
    passageiros: { passageiros: 14, passageirosPernoite: 6, tripulacao: 3 },
    roteiros: [
        {
            nome: "Costa Azul Premium",
            descricao: "Praia Secreta, Enseada Azul, Ilha da Pescaria",
            preco: { moeda: 'R$', valor: "11.000,00" },
            detalhesPagamento: "ou 5x de R$2.300"
        },
        {
            nome: "Roteiro Luxo Sul",
            descricao: "Caxadaço, Lopes Mendes, Dois Rios",
            preco: { moeda: 'R$', valor: "12.000,00" },
            detalhesPagamento: "ou 5x de R$2.500"
        },
        {
            nome: "Roteiro Volta à Ilha",
            descricao: "Provetá, Araçatiba, Aventureiro, Parnaioca",
            preco: { moeda: 'R$', valor: "13.000,00" },
            detalhesPagamento: "ou 5x de R$2.700"
        },
        {
            nome: "Tour Ilhas Secretas",
            descricao: "Cataguases, Gipoia, Praia da Fazenda, Jurubaíba",
            preco: { moeda: 'R$', valor: "14.500,00" },
            detalhesPagamento: "ou 5x de R$3.000"
        }
    ],
    pernoite: true,
    petFriendly: {id:2,opcao:"Pequeno porte"},
    itensDisponiveis: [
        { id: 5, item: "Gerador", itemLazer: false, quantidade: 2 },
        { id: 8, item: "Grill elétrico", itemLazer: false, quantidade: 1 },
        { id: 16, item: "Macarrão flutuante", itemLazer: true, quantidade: 2 }
    ],
    imagens: [
        { fileName: "file-20", link: "https://cdn.boatinternational.com/convert/files/2022/12/06/369774ad7f37916c389f0c03e40ef9d3/IMG-6018-jpg.jpg/r%5Bw_1600%5D/IMG-6018-jpg.webp" },
        { fileName: "file-21", link: "https://www.boatbookings.com/blog/wp-content/uploads/2021/07/Luxury-yacht-charter-Mediterranean.jpg" },
        { fileName: "file-22", link: "https://barcosluxo.com.br/wp-content/uploads/2021/10/ferretti-yacht-exterior.jpg" },
        { fileName: "file-23", link: "https://www.yachtcharterfleet.com/uploads/2020/02/45645/4564512-1568131401.jpg" },
        { fileName: "file-24", link: "https://yachtharbour.com/cache/photos/2018/11/11371_large.jpg" }
    ],
    consumoCombustivel: {
        litrosHora: 70,
        precoHora: { moeda: "R$", valor: "150,00" },
        tipoCombustivel: { id: 2, opcao: "Diesel" }
    },
    tipoPasseio: { id: 2, opcao: "Day use e pernoite" },
    tripulacaoSkipper: {id:1,opcao:"Tripulação inclusa"},
    horaExtra: { moeda: "R$", valor: "800,00" },
    aluguelLancha: { moeda: "R$", valor: "4.200,00" },
    taxaChurrasco: {
        preco: { moeda: "R$", valor: "1.800,00" },
        mensagem: "Taxa paga antecipadamente via Pix"
    },
    videoPromocional: 'https://www.youtube.com/watch?v=JfVOs4VSpmA'
}

export default barcoCharterOutputUpdate
