import { BarcoCharterInput, BarcoCharterInputWithId } from '../../types/charter/BarcoCharter.js'

const barcoCharterInput: BarcoCharterInputWithId = {
    id:1,
    modelo: "Azimut 70",
    nome: "Lancha Luxo",
    ano: 2022,
    tamanho: 50,
    preco: { moeda: "R$", valor: 1800.00 },
    passageiros: { passageiros: 10, passageirosPernoite: 4, tripulacao: 2 },
    roteiros: [
        {
            nome: "Ilhas Paradisíacas lado norte",
            descricao: "Piraquara, Laboratório, Pingo de Agua, Paquetá",
            preco: {moeda: 'R$', valor:9500},
            detalhesPagamento: "ou 5x de R$2.090"
        },
        {
            nome: "Ilhas Paradisíacas lado sul",
            descricao: "Botinas, Piedade, Flechas, Praia do Dentista",
            preco: { moeda: 'R$', valor: 9500},
            detalhesPagamento: "ou 5x de R$2.090"
        },
        {
            nome: "Ilha Grande",
            descricao: "Lagoa Azul, Lagoa Verde, Bananal, Aripeba, Sitio Forte",
            preco: { moeda: 'R$', valor: 10500},
            detalhesPagamento: "ou 5x de R$2.310"
        }, 
        {
            nome: "Ilha Grande 2",
            descricao: "Abraão, Saco do Céu, Feguesia, Japariz, Lagoa Azul (e arredores)",
            preco: { moeda: 'R$', valor: 11500},
            detalhesPagamento: "ou 5x de R$2.530"
        } 

    ],
    pernoite: true,
    petFriendly:{id:1, opcao:"Não"},
    itensDisponiveis: [
        { id: 8, item: "Grill elétrico", itemLazer: false, quantidade: 1 },
        { id: 10, item: "Boiler água quente", itemLazer: false, quantidade: 2 },
        { id: 12, item: "Plataforma de popa / Plataforma de popa estendida", itemLazer: false, quantidade: 1 }
    ],
    imagens: [
        { fileName: "file-7", link: "https://www.hmy.com/wp-content/uploads/2019/04/ferretti-760.jpg" },
        { fileName: "file-8", link: "https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg" },
        { fileName: "file-9", link: "https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg" },
        { fileName: "file-10", link: "https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg" },
        { fileName: "file-11", link: "https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg" },
    ],
    consumoCombustivel: { litrosHora: 50, precoHora: { moeda: "R$", valor: 100.00 }, tipoCombustivel: {id:2, opcao:"Diesel"} },
    tipoPasseio: {id:1, opcao:"Day use"},
    tripulacaoSkipper: {id: 2, opcao:"Skipper incluso"},
    horaExtra: { moeda: "R$", valor: 600.00 },
    aluguelLancha: { moeda: "R$", valor: 3500.00 },
    taxaChurrasco: { preco: { moeda: "R$", valor: 1500.00 }, mensagem: "Pagamento no dia do passeio diretamente ao capitão" },
    videoPromocional: 'https://www.youtube.com/watch?v=EZJ-S9RODF0'
}

export default barcoCharterInput