import { CustomError } from "../../../infra/CustoError.js";
import { Horarios } from "../../../types/charter/Horarios.js";
import { Passeio } from "../../../types/charter/Passeio.js";
import { validateIntegerPositiveNumber, validateString } from "../../../util/validationUtil.js";


export class PasseioInputVO {
    private id!: number;
    private tipoPasseio!: string;
    private embarquePrincipal!: string;
    private embarquesAlternativos!: string[];
    private pontoEncontro!: string;
    private horarios!: Horarios;
    private duracaoPasseio!: number;
    private tripulacaoSkipper!: string;

    constructor() { }

    setId(id: number) {
       validateIntegerPositiveNumber(id, "id", "Passeio")
        this.id = id;
    }

    setTipoPasseio(tipoPasseio: string) {
        validateString(tipoPasseio, "tipoPasseio", "Passeio")
        this.tipoPasseio = tipoPasseio;
    }

    setEmbarquePrincipal(embarquePrincipal: string) {
        validateString(embarquePrincipal, "embarquePrincipal", "Passeio")
        this.embarquePrincipal = embarquePrincipal;
    }

    setEmbarquesAlternativos(embarquesAlternativos: string[]) {
       embarquesAlternativos.forEach(item => {
            validateString(item, 'embarqueAlternativo', 'Passeio')
       });
        this.embarquesAlternativos = embarquesAlternativos;
    }

    setPontoEncontro(pontoEncontro: string) {
        validateString(pontoEncontro, "pontoEncontro", 'Passeio')
        this.pontoEncontro = pontoEncontro;
    }

    setHorarios(horarios: Horarios) {
        if (!horarios || typeof horarios !== "object") {
            throw new CustomError("Horários inválidos", 400);
        }
        this.horarios = horarios;
    }

    setDuracaoPasseio(duracaoPasseio: number) {
        validateIntegerPositiveNumber(duracaoPasseio, 'duracaoPasseio', 'Passeio')
        this.duracaoPasseio = duracaoPasseio;
    }

    setTripulacaoSkipper(tripulacaoSkipper: string) {
        validateString(tripulacaoSkipper, 'tripulacaoSkipper', 'Passeio')
        this.tripulacaoSkipper = tripulacaoSkipper;
    }

    extractData(): Passeio {
        return {
            id: this.id,
            tipoPasseio: this.tipoPasseio,
            embarquePrincipal: this.embarquePrincipal,
            embarquesAlternativos: this.embarquesAlternativos,
            pontoEncontro: this.pontoEncontro,
            horarios: this.horarios,
            duracaoPasseio: this.duracaoPasseio,
            tripulacaoSkipper: this.tripulacaoSkipper
        };
    }
}
