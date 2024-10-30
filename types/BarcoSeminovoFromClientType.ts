export type BarcoSeminovoFromClientType = {
    id: number
    modelo: string;
    nome: string;
    ano: number;
    tamanho: number;
    motorizacao: {
        modelo: string;
        quantidade: number;
        potencia: number;
        horas: number;
        ano: number;
        observacoes: string | null;
    };
    potenciaTotal: number;
    combustivel: string;
    propulsao: string;
    cabines: {
        passageiros: number;
        tripulacao: number;
    };
    procedencia: string;
    destaque: string;
    preco: {
        moeda: string;
        valor: number;
    };
    imagens: {
        id: number;
        link: string;
    }[];
    equipadoCom: {
        item: string;
        quantidade: number;
    }[];
    videoPromocional: string | null;
};
