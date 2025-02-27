import { CondicoesRepository } from "../../repository/charter/CondicoesRepository.js";
import { HorarioRepository } from "../../repository/charter/HorarioRepository.js";
import { LocalEmbarqueRepository } from "../../repository/charter/LocalEmbarqueRepository.js";
import { PasseioRepository } from "../../repository/charter/PasseioRepository.js";
import { TipoPasseioRepository } from "../../repository/charter/TipoPasseioRepo.js";
import { TripulacaoSkipperRepository } from "../../repository/charter/TripulacaoSkipperRepo.js";
import { PasseioInput, PasseioOutput } from "../../types/charter/Passeio.js";
import { CondicoesModel } from "./CondicoesModel.js";
import { HorariosModel } from "./HorariosModel.js";
import { LocalEmbarqueModel } from "./LocalEmbarqueModel.js";
import { TipoPasseioModel } from "./TipoPasseioModel.js";
import { TripulacaoSkipperModel } from "./TripulacaoSkipperModel.js";

export class PasseioModel {
    async getPasseioById(idPasseio:number, passeioRepository: PasseioRepository, localEmbarqueModel: LocalEmbarqueModel, horariosModel: HorariosModel, condicoesModel:CondicoesModel):Promise<PasseioOutput>{
        const embarquesAlternativosArray = await localEmbarqueModel.getLocaisByIdPasseio(idPasseio, new LocalEmbarqueRepository())
        const horariosArray = await horariosModel.getHorariosByIdPasseio(idPasseio, new HorarioRepository())
        const condicoesArray = await condicoesModel.getCondicoesByIdPasseio(idPasseio, new CondicoesRepository()) 
        const passeioDb = await passeioRepository.getPasseioById(idPasseio)
        const passeio: PasseioOutput = {
            id: passeioDb.id,
            tipoPasseio: passeioDb.tipo_passeio,
            embarquePrincipal: {
                id: passeioDb.embarque_principal_id,
                idPasseio: passeioDb.embarque_principal_id_passeio,
                nomeLocal: passeioDb.embarque_principal_local,
                pontoEncontro: passeioDb.embarque_principal_ponto_encontro,
                preco: null
            },
            condicoes: condicoesArray,
            embarquesAlternativos: embarquesAlternativosArray,
            horarios: horariosArray,
            duracaoPasseio: passeioDb.duracao_passeio,
            tripulacaoSkipper: passeioDb.tripulacao_skipper
        }
        return passeio
    }

    async postPasseio(passeio: PasseioInput, localEmbarqueRepository: LocalEmbarqueRepository, localEmbarqueModel:LocalEmbarqueModel, horariosModel: HorariosModel, condicoesModel:CondicoesModel, passeioRepository:PasseioRepository, TipoPasseioModel: TipoPasseioModel, tripulacaoSkipperModel: TripulacaoSkipperModel){
        const idTipoPasseio = await TipoPasseioModel.getIdTipoPasseioByString(passeio.tipoPasseio, new TipoPasseioRepository())
        const idTripulacaoSkipper = await  tripulacaoSkipperModel.getIdTripulacaoSkipperByString(passeio.tripulacaoSkipper, new TripulacaoSkipperRepository())
        await localEmbarqueRepository.postLocalEmbarquePrincipal(passeio.embarquePrincipal)
        const idPasseio = await passeioRepository.postPasseio(passeio, idTipoPasseio,idTripulacaoSkipper)
        await horariosModel.postHorariosPasseio(passeio.horarios,new HorarioRepository(), idPasseio) 
        await localEmbarqueModel.postLocaisAlternativos(passeio.embarquesAlternativos, new LocalEmbarqueRepository()) 
        await condicoesModel.associateCondicoesPasseio(idPasseio, passeio.condicoes, new CondicoesRepository())    
    }
}