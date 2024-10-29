class DadosSeminovo {
    constructor(
        public modelo: string,
        public nome: string,
        public ano: number,
        public tamanho: number,
        public motorizacao: { modelo: string; quantidade: number; horas: number; ano: number; observacoes: string | null },
        public potenciaTotal: number,
        public combustivel: string,
        public propulsao: string,
        public cabines: { passageiros: number; tripulacao: number },
        public procedencia: string,
        public destaque: string,
        public preco: { moeda: string; valor: number },
        public imagens: string[] = [],
        public equipadoCom: { item: string; quantidade: number }[],
        public videoPromocional: string | null
    ) { }
}

export default DadosSeminovo;
