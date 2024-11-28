
import {admin} from "../infra/firebase/firebase-config.ts"
import { ImagemRepository } from "../repository/ImagemRepository.ts"
import { Imagem } from "../types/Imagem.ts"
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.ts"
import { ImagemOutputVO } from "../value_object/output/ImagemOutputVO.ts"

interface imagemDatabase {
    imagem_id: number,
    link_imagem: string
}

export class ImagemModel {
    constructor(){

    }
    async getImagesByIdSeminovo(idSeminovo:number, imagemRepository: ImagemRepository){
        const imagens = await imagemRepository.getImagensByIdSeminovo(idSeminovo)
        const imagensDto = imagens.map((img:imagemDatabase) => {
            const imagemOutputValueObject = new ImagemOutputVO()
            imagemOutputValueObject.setId(img.imagem_id)
            imagemOutputValueObject.setLink(img.link_imagem)
            return imagemOutputValueObject.extractData()
        })
        return imagensDto
    }
   
    async insertImagensForSeminovo(imagens: Imagem[], idSeminovo: number, imagemRepository: ImagemRepository,){
        for (let i = 0; i < imagens.length; i++) {
            const imagem = imagens[i];
            const idImagem = await imagemRepository.insertImagem(imagem.link)
            imagemRepository.associateImagemWhithSeminovo(idSeminovo, idImagem)     
        }
    }

    async deleteAllImagesFromSeminovo(idSeminovo: number, imagemRepository: ImagemRepository){
        const imagensSeminovo = await imagemRepository.getImagensByIdSeminovo(idSeminovo)
        imagensSeminovo.map(async (imagem:imagemDatabase) => {
            await imagemRepository.deleteAssociationImagemSeminovo(imagem.imagem_id)
            await imagemRepository.deleteImagem(imagem.imagem_id)
        })
    }

    validateImages(imagens: Imagem[], imagemVO: ImagemInputVO):Imagem[]{
        const validatedImages = imagens.map((imagem)=> {
            imagemVO.setLink(imagem.link)
            return imagemVO.extractData()
        })
        return validatedImages
    }

    deleteImagesFromFirebase(){
        admin
    }
}