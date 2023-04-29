import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Product } from "src/products/products.model"
import { ProductStages } from "src/stages/product-stages.model"
import { Stage } from "src/stages/stages.model"
import { Order } from "./orders.model"
import { ApiProperty } from "@nestjs/swagger"

interface OrderPoductsCreationAttrs {
    quantity: number
}

@Table({ tableName: 'order_products', createdAt: false, updatedAt: false })
export class OrderProducts extends Model<OrderProducts, OrderPoductsCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id_order_product: number

    @ApiProperty({ example: '1', description: 'Идентификатор заказа' })
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER })
    id_order: number

    @ApiProperty({ example: '1', description: 'Идентификатор товара' })
    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER })
    id_product: number

    @ApiProperty({ example: '12', description: 'Количество товара' })
    @Column({ type: DataType.INTEGER })
    quantity: number

    @ApiProperty({ example: 'false', description: 'Произведен ли товар' })
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
    is_produced: boolean

    @BelongsToMany(() => Stage, () => ProductStages)
    stages: Stage[]
}