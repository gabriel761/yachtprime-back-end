export type HorariosOutput = {
    id: number;
    idPasseio: number;
    horarioInicio: string;
    horarioFim: string;
}

export type HorariosInput = {
    horarioInicio: string;
    horarioFim: string;
}

export type HorariosDb = {
    id: number;
    id_passeio: number;
    horario_inicio: string;
    horario_fim: string;
}