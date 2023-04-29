import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateStatusDto } from './dto/create-status.dto'
import { Status } from './statuses.model'

@Injectable()
export class StatusesService {

    constructor(@InjectModel(Status) private statusRepository: typeof Status) { }

    //добавление нового статуса
    async createStatus(dto: CreateStatusDto) {
        const status = await this.statusRepository.findOne({ where: { title: dto.title } })
        if (status) {
            throw new HttpException(`Статус с таким названием уже существует: ${dto.title}`, HttpStatus.BAD_REQUEST)
        }

        const newStatus = await this.statusRepository.create(dto)
        return newStatus
    }

    //получение всех статусов
    async getAllStatuses() {
        const statuses = await this.statusRepository.findAll()
        return statuses
    }

    //получение статуса по названию
    async getStatusByTitle(title: string) {
        const status = await this.statusRepository.findOne({ where: { title } })
        if (!status) {
            throw new HttpException(`Статус не найден: ${title}`, HttpStatus.NOT_FOUND)
        }
        return status
    }
}