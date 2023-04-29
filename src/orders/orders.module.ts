import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { Product } from 'src/products/products.model'
import { ProductsModule } from 'src/products/products.module'
import { ProductStages } from 'src/stages/product-stages.model'
import { StagesModule } from 'src/stages/stages.module'
import { Status } from 'src/statuses/statuses.model'
import { StatusesModule } from 'src/statuses/statuses.module'
import { OrderProducts } from './order-products.model'
import { OrdersController } from './orders.controller'
import { Order } from './orders.model'
import { OrdersService } from './orders.service'

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	imports: [
		SequelizeModule.forFeature([Order, Product, OrderProducts, Status, ProductStages]),
		ProductsModule,
		StagesModule,
		StatusesModule
	]
})

export class OrdersModule { }