import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { AddProductDto } from './dto/add-product.dto'
import { AddStageDto } from './dto/add-stage.dto'
import { CreateOrderDto } from './dto/order-create.dto'
import { updateStatusDto } from './dto/update-status.dto'
import { OrdersService } from './orders.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Order } from './orders.model'

@ApiTags('Заказы')
@Controller('api/orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) { }

    @ApiOperation({ summary: 'Создание нового заказа' })
    @ApiResponse({ status: 200, type: [Order] })
    @Post()
    create(@Body() orderDto: CreateOrderDto) {
        return this.ordersService.createOrder(orderDto)
    }

    @ApiOperation({ summary: 'Получить заказ по уникальному идентификатору' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/:id')
    getOrderById(@Param('id') id: number) {
        return this.ordersService.getOrderById(id)
    }

    @ApiOperation({ summary: 'Получить все заказы' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get()
    getAll() {
        return this.ordersService.getAllOrders()
    }

    @ApiOperation({ summary: 'Получение информации: производится ли сейчас какой-нибудь заказ' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/in-production/:title')
    getProduce(@Param('title') title: string) {
        return this.ordersService.getProduce(title)
    }

    @ApiOperation({ summary: 'Получение товаров в заказе по идентификатору заказа' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/products/:id')
    getProducts(@Param('id') id: number) {
        return this.ordersService.getProductsByIdOrder(id)
    }

    @ApiOperation({ summary: 'Поучение всех стадий конкретного товара в заказе' })
    @ApiResponse({ status: 200, type: [Order] })
    @Get('/stages-product/:id')
    getStagesProduct(@Param('id') id: number) {
        return this.ordersService.getStagesProduct(id)
    }

    @ApiOperation({ summary: 'Добавление товара в уже существующий заказ' })
    @ApiResponse({ status: 200, type: [Order] })
    @Post('/product')
    addProduct(@Body() dto: AddProductDto) {
        return this.ordersService.addProduct(dto)
    }

    @ApiOperation({ summary: 'Создание новой стадии производства товара' })
    @ApiResponse({ status: 200, type: [Order] })
    @Post('/stage-product')
    addStageProduct(@Body() dto: AddStageDto) {
        return this.ordersService.addStageProduct(dto)
    }

    @ApiOperation({ summary: 'Обновление статуса заказа' })
    @ApiResponse({ status: 200, type: [Order] })
    @Put('/:id')
    updateStatus(@Param('id') id: number, @Body() dto: updateStatusDto) {
        return this.ordersService.updateStatus(id, dto)
    }
}
