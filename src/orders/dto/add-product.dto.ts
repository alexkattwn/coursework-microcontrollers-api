import { ApiProperty } from "@nestjs/swagger"

export class AddProductDto {
    @ApiProperty({ example: 'коробка', description: 'Название товара' })
    readonly title: string
    @ApiProperty({ example: '1', description: 'Идентификатор заказа' })
    readonly id_order: number
    @ApiProperty({ example: '24', description: 'Количество товара' })
    readonly quantity: number
}