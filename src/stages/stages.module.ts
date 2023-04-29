import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { OrderProducts } from 'src/orders/order-products.model'
import { ProductStages } from './product-stages.model'
import { StagesController } from './stages.controller'
import { Stage } from './stages.model'
import { StagesService } from './stages.service'

@Module({
    controllers: [StagesController],
    providers: [StagesService],
    imports: [
        SequelizeModule.forFeature([Stage, ProductStages, OrderProducts])
    ],
    exports: [
        StagesService
    ]
})

export class StagesModule { }