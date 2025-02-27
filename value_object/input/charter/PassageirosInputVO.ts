import { CustomError } from "../../../infra/CustoError.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { validateIntegerPositiveNumber } from "../../../util/validationUtil.js";


export class PassageirosInputVO {
    private id!: number;
    private passageiros!: number;
    private passageirosPernoite!: number;
    private tripulacao!: number;

    constructor() { }

    setId(id: number) {
        validateIntegerPositiveNumber(id, "id", "Passageiros")
        this.id = id;
    }

    setPassageiros(passageiros: number) {
        validateIntegerPositiveNumber(passageiros, "passageiros", "Passageiros")
        this.passageiros = passageiros;
    }

    setPassageirosPernoite(passageirosPernoite: number) {
        validateIntegerPositiveNumber(passageirosPernoite, "passageiros pernoite", "Passageiros")
        this.passageirosPernoite = passageirosPernoite;
    }

    setTripulacao(tripulacao: number) {
        validateIntegerPositiveNumber(tripulacao, "tripulação", "Passageiros")
        this.tripulacao = tripulacao;
    }

    extractData(): Passageiros {
        return {
            id: this.id,
            passageiros: this.passageiros,
            passageirosPernoite: this.passageirosPernoite,
            tripulacao: this.tripulacao
        };
    }
}
