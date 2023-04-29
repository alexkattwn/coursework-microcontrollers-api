import { Body, Controller, Get, Param, Post, } from '@nestjs/common'
import { CreateStageDto } from './dto/create-stage.dto'
import { StagesService } from './stages.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Stage } from './stages.model'

@ApiTags('Этапы производства')
@Controller('api/stages')
export class StagesController {

    constructor(private stagesService: StagesService) { }

    @ApiOperation({ summary: 'Добавление нового этапа производства' })
    @ApiResponse({ status: 200, type: [Stage] })
    @Post()
    create(@Body() stageDto: CreateStageDto) {
        return this.stagesService.createStage(stageDto)
    }

    @ApiOperation({ summary: 'Получить все этапы производства' })
    @ApiResponse({ status: 200, type: [Stage] })
    @Get()
    getAll() {
        return this.stagesService.getAllStages()
    }

    @ApiOperation({ summary: 'Получить этап по названию' })
    @ApiResponse({ status: 200, type: [Stage] })
    @Get('/:title')
    getByTitle(@Param('title') title: string) {
        return this.stagesService.getStageByTitle(title)
    }

    @ApiOperation({ summary: 'Получить этап по порядковому номеру' })
    @ApiResponse({ status: 200, type: [Stage] })
    @Get('/num/:number')
    getByNumber(@Param('number') number: number) {
        return this.stagesService.getStageByNumber(number)
    }
}