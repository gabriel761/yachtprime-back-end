import { BarcoCharterInput } from '../../types/charter/BarcoCharter.js'

const barcoCharterInput: BarcoCharterInput = {
    modelo: "Azimut 70",
    nome: "Lancha Luxo",
    ano: 2022,
    tamanho: 50,
    preco: { moeda: "R$", valor: 5000.00 },
    passageiros: { passageiros: 10, passageirosPernoite: 4, tripulacao: 2 },
    passeio: {
        tipoPasseio: "Day use",
        embarquePrincipal: {
            nomeLocal: "Marina da Glória",
            pontoEncontro: "Restaurante Kitchen",
            preco: null
        },
        embarquesAlternativos: [{ nomeLocal: "Iate clube Niterói", preco: { moeda: "R$", valor: "100,00" }, pontoEncontro: null }],
        horarios: [
            { horarioInicio: "08:00:00", horarioFim: "13:00:00" },
            { horarioInicio: "14:00:00", horarioFim: "20:00:00" }
        ],
        duracaoPasseio: 10,
        tripulacaoSkipper: "Skipper incluso",
        condicoes: [
            { id: 3, condicao: "Só aceitamos pagamentos no PIX." },
            { id: 4, condicao: "Reservas mediante 50% de sinal." },
            { id: 6, condicao: "Em caso de ressaca impeditiva de navegar, aguardar no dia para remarcação de nova data (chuva, frio, tempo nublado não impedem de navegar)." },
        ],
    },
    pernoite: true,
    petFriendly: "Não",
    itensDisponiveis: [
        {  item: "Grill elétrico", itemLazer: false, quantidade: 1 },
        {  item: "Boiler água quente", itemLazer: false, quantidade: 2 },
        {  item: "Plataforma de popa / Plataforma de popa estendida", itemLazer: false, quantidade: 1 }
    ],
    imagens: [
        {  fileName: "file-7", link: "https://www.hmy.com/wp-content/uploads/2019/04/ferretti-760.jpg" },
        {  fileName: "file-8", link: "https://mondblu.com.br/wp-content/uploads/2022/05/01d0f1f6-f540-4d71-ba68-b8b69a542651.jpg" },
        {  fileName: "file-9", link: "https://i.ytimg.com/vi/AxyUXPHmYxY/maxresdefault.jpg" },
        {  fileName: "file-10", link: "https://marealtacharter.com.br/wp-content/uploads/2020/09/Aluguel-de-barco-ferretti-760-em-Angra-dos-Reis-003.jpg" },
        {  fileName: "file-11", link: "https://sailica-prod-main.s3.eu-central-1.amazonaws.com/3342868030000104834/large/1b651ac54ce528a2275d681abbd21a41.jpg" },
    ],
    consumoCombustivel: { litrosHora: 50, precoHora: { moeda: "R$", valor: 100.00 }, tipoCombustivel: "Dísel" },
    horaExtra: { moeda: "R$", valor: 600.00 },
    aluguelLancha: { moeda: "R$", valor: 3500.00 },
    taxaChurrasco: { preco: { moeda: "R$", valor: 200.00 }, mensagem: "Pagamento no dia do passeio diretamente ao capitão" },
    videoPromocional: 'https://www.youtube.com/watch?v=EZJ-S9RODF0'
}

export default barcoCharterInput