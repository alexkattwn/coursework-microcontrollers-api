import { ApiProperty } from "@nestjs/swagger"
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript"
import { OrderProducts } from "src/orders/order-products.model"
import { Order } from "src/orders/orders.model"

interface ProductCreationAttrs {
    title: string
    code: string
}

@Table({ tableName: 'products', createdAt: false, updatedAt: false })
export class Product extends Model<Product, ProductCreationAttrs> {

    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id_product: number

    @ApiProperty({ example: 'коробка', description: 'Название товара' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    title: string

    @ApiProperty({ example: '12345678', description: 'Код товара' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    code: string

    @BelongsToMany(() => Order, () => OrderProducts)
    orders: Order[]
}