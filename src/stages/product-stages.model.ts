import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { OrderProducts } from "src/orders/order-products.model"
import { Stage } from "./stages.model"
import { ApiProperty } from "@nestjs/swagger"

interface ProductStagesCreationAttrs {
    date_start: Date
    date_end: Date
}

@Table({ tableName: 'product_stages', createdAt: false, updatedAt: false })
export class ProductStages extends Model<ProductStages, ProductStagesCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id_product_stage: number

    @ApiProperty({ example: '1', description: 'Идентификатор товара в заказе' })
    @ForeignKey(() => OrderProducts)
    @Column({ type: DataType.INTEGER })
    id_order_product: number

    @ApiProperty({ example: '1', description: 'Идентификатор этапа производства' })
    @ForeignKey(() => Stage)
    @Column({ type: DataType.INTEGER })
    id_stage: number

    @ApiProperty({ example: '2022-04-12', description: 'Дата начала этапа' })
    @Column({ type: DataType.DATE })
    date_start: Date

    @ApiProperty({ example: '2022-04-13', description: 'Дата конца этапа' })
    @Column({ type: DataType.DATE })
    date_end: Date
}