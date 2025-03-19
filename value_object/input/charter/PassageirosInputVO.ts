import { CustomError } from "../../../infra/CustoError.js";
import { Passageiros } from "../../../types/charter/Passageiros.js";
import { validateIntegerPositiveNumber } from "../../../util/validationUtil.js";


export class PassageirosInputVO {
   
    private passageiros!: number;
    private passageirosPernoite!: number | null;
    private tripulacao!: number;

    constructor() { }


    setPassageiros(passageiros: number) {
        validateIntegerPositiveNumber(passageiros, "passageiros", "Passageiros")
        this.passageiros = passageiros;
    }

    setPassageirosPernoite(passageirosPernoite: number| null) {
        if(passageirosPernoite == null) return
        validateIntegerPositiveNumber(passageirosPernoite, "passageiros pernoite", "Passageiros")
        this.passageirosPernoite = passageirosPernoite;
    }

    setTripulacao(tripulacao: number) {
        validateIntegerPositiveNumber(tripulacao, "tripulação", "Passageiros")
        this.tripulacao = tripulacao;
    }

    extractData(): Passageiros {
        return {
            passageiros: this.passageiros,
            passageirosPernoite: this.passageirosPernoite,
            tripulacao: this.tripulacao
        };
    }
}
