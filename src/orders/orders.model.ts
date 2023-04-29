import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Product } from "src/products/products.model"
import { Status } from "src/statuses/statuses.model"
import { OrderProducts } from "./order-products.model"
import { ApiProperty } from "@nestjs/swagger"

interface OrderCreationAttrs {
    date_start: Date
    date_end: Date
    is_finished: boolean
    id_status: number
}

@Table({ tableName: 'orders', createdAt: false, updatedAt: false })
export class Order extends Model<Order, OrderCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id_order: number

    @ApiProperty({ example: '2022-04-12', description: 'Дата оформления заказа' })
    @Column({ type: DataType.DATE, allowNull: false })
    date_start: Date

    @ApiProperty({ example: '2022-05-12', description: 'Дата окончания производства заказа' })
    @Column({ type: DataType.DATE, allowNull: false })
    date_end: Date

    @ApiProperty({ example: 'false', description: 'Готовность заказа' })
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    is_finished: boolean

    @BelongsToMany(() => Product, () => OrderProducts)
    products: Product[]

    @ApiProperty({ example: '1', description: 'Идентификатор статуса' })
    @ForeignKey(() => Status)
    @Column({ type: DataType.INTEGER, allowNull: false })
    id_status: number

    @BelongsTo(() => Status)
    status: Status
}