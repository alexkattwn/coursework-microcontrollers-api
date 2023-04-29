import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CreateStatusDto } from './dto/create-status.dto'
import { StatusesService } from './statuses.service'
import { Status } from './statuses.model'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Статусы')
@Controller('api/statuses')
export class StatusesController {

    constructor(private statusService: StatusesService) { }

    @ApiOperation({ summary: 'Добавление нового статуса' })
    @ApiResponse({ status: 200, type: [Status] })
    @Post()
    create(@Body() statusDto: CreateStatusDto) {
        return this.statusService.createStatus(statusDto)
    }

    @ApiOperation({ summary: 'Получить все статусы' })
    @ApiResponse({ status: 200, type: [Status] })
    @Get()
    getAll() {
        return this.statusService.getAllStatuses()
    }

    @ApiOperation({ summary: 'Получить статус по названию' })
    @ApiResponse({ status: 200, type: [Status] })
    @Get('/:title')
    getByTitle(@Param('title') title: string) {
        return this.statusService.getStatusByTitle(title)
    }
}