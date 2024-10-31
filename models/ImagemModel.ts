import { ImagemDto } from "../dto/ImagemDto.ts"

interface imagemDatabase {
    imagem_id: number,
    link_imagem: string
}

export class ImagemModel {
    constructor(){

    }
    buildImagemDtoCollectionFromDatabase(imagens: []){
        const imagensDto = imagens.map((img:imagemDatabase) => {
            return new ImagemDto(img.imagem_id,img.link_imagem)
        })
        return imagensDto
    }
    buildImagemDtoFromClient(){
        
    }
}