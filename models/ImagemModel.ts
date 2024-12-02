

import { CustomError } from "../infra/CustoError.ts"
import { ImagemRepository } from "../repository/ImagemRepository.ts"
import { Imagem } from "../types/Imagem.ts"
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.ts"
import { ImagemOutputVO } from "../value_object/output/ImagemOutputVO.ts"
import { FirebaseModel } from "./external/FirebaseModel.ts"

interface imagemDatabase {
    imagem_id: number,
    link_imagem: string
    imagem_file_name: string
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
            imagemOutputValueObject.setFileName(img.imagem_file_name)
            return imagemOutputValueObject.extractData()
        })
        return imagensDto
    }
   
    async insertImagensForSeminovo(imagens: Imagem[], idSeminovo: number, imagemRepository: ImagemRepository,){
        for (let i = 0; i < imagens.length; i++) {
            const imagem = imagens[i];
            const idImagem = await imagemRepository.insertImagem(imagem.link, imagem.fileName)
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
        try {
            const validatedImages = imagens.map((imagem) => {
                imagemVO.setLink(imagem.link)
                imagemVO.setFileName(imagem.fileName)
                return imagemVO.extractData()
            })
            return validatedImages 
        } catch (error: any) {
            throw new CustomError("Model level error: Imagem: "+error.message, 500)
        }
        
    }

    async deleteImagesFromFirebase(images:Imagem[], firebaseModel: FirebaseModel){
        images.forEach(async (item:Imagem) => {
             await firebaseModel.deleteImage("seminovo", item.fileName)
        })
        
    }
}