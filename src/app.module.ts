import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { AppController } from './app.controller'
import { Product } from './products/products.model'
import { ProductsModule } from './products/products.module'
import { OrdersModule } from './orders/orders.module'
import { Order } from './orders/orders.model'
import { OrderProducts } from './orders/order-products.model'
import { StagesModule } from './stages/stages.module'
import { Stage } from './stages/stages.model'
import { ProductStages } from './stages/product-stages.model'
import { StatusesModule } from './statuses/statuses.module'
import { Status } from './statuses/statuses.model'

@Module({
    controllers: [AppController],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Product, Order, OrderProducts, Stage, ProductStages, Status],
            autoLoadModels: true,
            synchronize: true
        }),
        ProductsModule,
        OrdersModule,
        StagesModule,
        StatusesModule,
    ],
})

export class AppModule { }