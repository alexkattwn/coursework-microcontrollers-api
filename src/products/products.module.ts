import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { OrderProducts } from 'src/orders/order-products.model'
import { Order } from 'src/orders/orders.model'
import { ProductsController } from './products.controller'
import { Product } from './products.model'
import { ProductsService } from './products.service'

@Module({
    controllers: [ProductsController],
    providers: [ProductsService],
    imports: [
        SequelizeModule.forFeature([Product, Order, OrderProducts])
    ],
    exports: [
        ProductsService
    ]
})

export class ProductsModule { }