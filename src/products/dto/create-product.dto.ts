import { ApiProperty } from "@nestjs/swagger"

export class CreateProductDto {
    @ApiProperty({ example: 'коробка', description: 'Название товара' })
    readonly title: string
    @ApiProperty({ example: '12345678', description: 'Код товара' })
    readonly code: string
}