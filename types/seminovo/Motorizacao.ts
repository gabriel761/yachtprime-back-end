export type Motorizacao = {
    id?:number;
    modelo: string;
    quantidade: number;
    potencia: number;
    horas: number;
    ano: number;
    observacoes?: string | null;
}