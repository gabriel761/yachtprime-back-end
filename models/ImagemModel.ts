

import { CustomError } from "../infra/CustoError.js"
import { ImagemRepository } from "../repository/ImagemRepository.js"
import { Imagem } from "../types/Imagem.js"
import { ImagemInputVO } from "../value_object/input/ImagemInputVO.js"
import { ImagemOutputVO } from "../value_object/output/ImagemOutputVO.js"
import { FirebaseModel } from "./external/FirebaseModel.js"

interface imagemDatabase {
    id_imagem: number,
    link_imagem: string
    imagem_file_name: string
}

export class ImagemModel {

    async getImagesByIdSeminovo(idSeminovo: number, imagemRepository: ImagemRepository) {
        const imagens = await imagemRepository.getImagensByIdSeminovo(idSeminovo)
        const imagensDto = imagens.map((img: imagemDatabase) => {
            const imagemOutputValueObject = new ImagemOutputVO()
            imagemOutputValueObject.setLink(img.link_imagem)
            imagemOutputValueObject.setFileName(img.imagem_file_name)
            return imagemOutputValueObject.extractData()
        })
        return imagensDto
    }

    async getImagesByIdCharter(idCharter: number, imagemRepository: ImagemRepository) {
        const imagens = await imagemRepository.getImagensByIdCharter(idCharter)
        const imagensDto = imagens.map((img: imagemDatabase) => {
            const imagemOutputValueObject = new ImagemOutputVO()
            imagemOutputValueObject.setLink(img.link_imagem)
            imagemOutputValueObject.setFileName(img.imagem_file_name)
            return imagemOutputValueObject.extractData()
        })
        return imagensDto
    }

    async insertImagensForSeminovo(imagens: Imagem[], idSeminovo: number, imagemRepository: ImagemRepository,) {
        for (let i = 0; i < imagens.length; i++) {
            const imagem = imagens[i];
            const idImagem = await imagemRepository.insertImagem(imagem.link, imagem.fileName)
            imagemRepository.associateImagemWhithSeminovo(idSeminovo, idImagem)
        }
    }

    async insertImagensForCharter(imagens: Imagem[], idCharter: number, imagemRepository: ImagemRepository,) {
        for (let i = 0; i < imagens.length; i++) {
            const imagem = imagens[i];
            const idImagem = await imagemRepository.insertImagem(imagem.link, imagem.fileName)
            imagemRepository.associateImagemWhithCharter(idCharter, idImagem)
        }
    }

    async deleteAllImagesFromSeminovo(idSeminovo: number, imagemRepository: ImagemRepository) {
        const imagensSeminovo = await imagemRepository.getImagensByIdSeminovo(idSeminovo)
        const imagensSeminovoPromises = imagensSeminovo.map(async (imagem: imagemDatabase) => {
            await imagemRepository.deleteAssociationImagemSeminovo(imagem.id_imagem)
            await imagemRepository.deleteImagem(imagem.id_imagem)
        })
        await Promise.all(imagensSeminovoPromises);
    }

    async deleteAllImagesFromCharter(idCharter: number, imagemRepository: ImagemRepository) {
        const imagensCharter = await imagemRepository.getImagensByIdCharter(idCharter)
        const imagensCharterPromises = imagensCharter.map(async (imagem: imagemDatabase) => {
            await imagemRepository.deleteAssociationImagemCharter(imagem.id_imagem)
            await imagemRepository.deleteImagem(imagem.id_imagem)
        })
        await Promise.all(imagensCharterPromises);
    }

    validateImages(imagens: Imagem[], imagemVO: ImagemInputVO): Imagem[] {
        try {
            const validatedImages = imagens.map((imagem) => {
                imagemVO.setLink(imagem.link)
                imagemVO.setFileName(imagem.fileName)
                return imagemVO.extractData()
            })
            return validatedImages
        } catch (error: any) {
            throw new CustomError("Model level error: Imagem: " + error.message, 500)
        }

    }

    async deleteImagesFromFirebase(images: Imagem[], firebaseModel: FirebaseModel, pasta: string) {
        try {
            const deletePromises = images.map(async (item) => {
                try {
                    await firebaseModel.deleteImage(pasta, item.fileName)
                } catch (error) {
                    throw error
                }
            })
            await Promise.all(deletePromises);
        } catch (error) {
            throw error
        }
    }

}