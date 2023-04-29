import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {
    @ApiProperty({ example: '2022-04-12', description: 'Дата оформления заказа' })
    readonly date_start: Date
    @ApiProperty({ example: '2022-05-12', description: 'Дата окончания производства заказа' })
    readonly date_end: Date
    @ApiProperty({ example: 'false', description: 'Готовность товара' })
    readonly is_finished: boolean
    @ApiProperty({ example: '1', description: 'Идентификатор статуса' })
    readonly id_status: number
    @ApiProperty({ example: 'Товары', description: 'Массив товаров' })
    readonly products: Products[]
}

interface Products {
    id_product: number,
    title: string
    quantity: number
}