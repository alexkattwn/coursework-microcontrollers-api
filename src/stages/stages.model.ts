import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { OrderProducts } from "src/orders/order-products.model"
import { ProductStages } from "./product-stages.model"
import { ApiProperty } from "@nestjs/swagger"

interface StagesCreationAttrs {
    title: string
    description: string
    number: number
}

@Table({ tableName: 'stages', createdAt: false, updatedAt: false })
export class Stage extends Model<Stage, StagesCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id_stage: number

    @ApiProperty({ example: 'Первый', description: 'Название этапа производства' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string

    @ApiProperty({ example: 'С этого этапа начинается производство...', description: 'Описание этапа производства' })
    @Column({ type: DataType.STRING })
    description: string

    @ApiProperty({ example: '1', description: 'Порядковый номер этапа' })
    @Column({ type: DataType.INTEGER })
    number: number

    @BelongsToMany(() => OrderProducts, () => ProductStages)
    orderProducts: OrderProducts[]
}