import { CustomError } from "../../../infra/CustoError.js";
import { Horarios } from "../../../types/charter/Horarios.js";
import { Passeio } from "../../../types/charter/Passeio.js";


export class PasseioOutputVO {
    private id!: number;
    private tipoPasseio!: string;
    private embarquePrincipal!: string;
    private embarquesAlternativos!: string[];
    private horarios!: Horarios;
    private duracaoPasseio!: number;
    private tripulacaoSkipper!: string;

    constructor() { }

    setId(id: number) {
        this.id = id;
    }

    setTipoPasseio(tipoPasseio: string) {
        this.tipoPasseio = tipoPasseio;
    }

    setEmbarquePrincipal(embarquePrincipal: string) {
        this.embarquePrincipal = embarquePrincipal;
    }

    setEmbarquesAlternativos(embarquesAlternativos: string[]) {
        this.embarquesAlternativos = embarquesAlternativos;
    }

    setHorarios(horarios: Horarios) {
        this.horarios = horarios;
    }

    setDuracaoPasseio(duracaoPasseio: number) {
        this.duracaoPasseio = duracaoPasseio;
    }

    setTripulacaoSkipper(tripulacaoSkipper: string) {
        this.tripulacaoSkipper = tripulacaoSkipper;
    }

    extractData(): Passeio {
        return {
            id: this.id,
             tipoPasseio: this.tipoPasseio,
            embarquePrincipal: this.embarquePrincipal,
            embarquesAlternativos: this.embarquesAlternativos,
            horarios: this.horarios,
            duracaoPasseio: this.duracaoPasseio,
            tripulacaoSkipper: this.tripulacaoSkipper
        };
    }
}
