import { ApiProperty } from "@nestjs/swagger"

export class CreateStageDto {
    @ApiProperty({ example: 'Первый', description: 'Название этапа производства' })
    readonly title: string
    @ApiProperty({ example: 'На этом этапе начинается производство...', description: 'Описание этапа производства' })
    readonly description: string
    @ApiProperty({ example: '1', description: 'порядковый номер этапа' })
    readonly number: number
}