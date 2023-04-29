import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Order } from "src/orders/orders.model"

interface StatusesCreationAttrs {
    title: string
}

@Table({ tableName: 'statuses', createdAt: false, updatedAt: false })
export class Status extends Model<Status, StatusesCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id_status: number

    @ApiProperty({ example: 'В производстве', description: 'Наименование статуса' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string

    @HasMany(() => Order)
    order: Order[]
}