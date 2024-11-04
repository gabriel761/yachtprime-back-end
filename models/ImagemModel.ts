import { ImagemDto } from "../dto/ImagemDto.ts"
import { ImagemRepository } from "../repository/ImagemRepository.ts"
import { Imagem } from "../types/Imagem.ts"

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
            return new ImagemDto(img.imagem_id,img.link_imagem)
        })
        return imagensDto
    }
    buildImagemDtoFromClient(){
        
    }
    async insertImagensForSeminovo(imagens: Imagem[], idSeminovo: number, imagemRepository: ImagemRepository,){
        for (let i = 0; i < imagens.length; i++) {
            const imagem = imagens[i];
            const idImagem = await imagemRepository.insertImagem(imagem.link)
            imagemRepository.associateImagemWhithSeminovo(idSeminovo, idImagem)     
        }
    }
}