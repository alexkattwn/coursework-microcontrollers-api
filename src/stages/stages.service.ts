import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateStageDto } from './dto/create-stage.dto'
import { Stage } from './stages.model'

@Injectable()
export class StagesService {

    constructor(@InjectModel(Stage) private stageRepository: typeof Stage) { }

    //добавление нового этапа
    async createStage(dto: CreateStageDto) {
        const stage = await this.stageRepository.findOne({ where: { title: dto.title } })
        if (stage) {
            throw new HttpException(`Этап с таким названием уже существует: ${dto.title}`, HttpStatus.BAD_REQUEST)
        }

        const newStage = await this.stageRepository.create(dto)
        return newStage
    }

    //получение всех этапов
    async getAllStages() {
        let stages = await this.stageRepository.findAll()
        stages = [...stages.sort((a, b) => a.number - b.number)]
        return stages
    }

    //получение этапа по названию
    async getStageByTitle(title: string) {
        const stage = await this.stageRepository.findOne({ where: { title } })
        if (!stage) {
            throw new HttpException(`Этап производства с таким названием не найден: ${title}`, HttpStatus.NOT_FOUND)
        }
        return stage
    }

    //получение этапа по порядковому номеру
    async getStageByNumber(number: number) {
        const stage = await this.stageRepository.findOne({ where: { number } })
        if (!stage) {
            throw new HttpException(`Этап производства под таким номером не существует: ${number}`, HttpStatus.NOT_FOUND)
        }
        return stage
    }
}