import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ProductsService } from 'src/products/products.service'
import { ProductStages } from 'src/stages/product-stages.model'
import { StagesService } from 'src/stages/stages.service'
import { CreateStatusDto } from 'src/statuses/dto/create-status.dto'
import { Status } from 'src/statuses/statuses.model'
import { StatusesService } from 'src/statuses/statuses.service'
import { AddProductDto } from './dto/add-product.dto'
import { AddStageDto } from './dto/add-stage.dto'
import { CreateOrderDto } from './dto/order-create.dto'
import { updateStatusDto } from './dto/update-status.dto'
import { OrderProducts } from './order-products.model'
import { Order } from './orders.model'

@Injectable()
export class OrdersService {

    constructor(
        @InjectModel(Order) private orderRepository: typeof Order,
        @InjectModel(OrderProducts) private orderProductsRepository: typeof OrderProducts,
        @InjectModel(ProductStages) private productStagesRepository: typeof ProductStages,
        private productService: ProductsService,
        private stageService: StagesService,
        private statusService: StatusesService,
        @InjectModel(Status) private statusRepository: typeof Status
    ) { }

    //создание заказа
    async createOrder(dto: CreateOrderDto) {
        //поиск статуса заказа с названием "В очереди"
        let status = await this.statusRepository.findOne({ where: { title: 'В очереди' } })
        //если его нет
        if (!status) {
            //формируем dto объект для создания статуса
            const statusDto: CreateStatusDto = new CreateStatusDto('В очереди')
            //добавляем в бд
            status = await this.statusRepository.create(statusDto)
        }

        //создание заказа
        const newOrder = await this.orderRepository.create({ ...dto, id_status: status.id_status })
        //если заказ успешно создался и в запросе указаны товары
        if (newOrder && dto.products) {
            //проход по массиву товаров
            dto.products.forEach(async (p) => {
                //получение товара по его названию
                const product = await this.productService.getProductByTitle(p.title)
                //добавление товара в только что созданный заказ
                await newOrder.$add('product', product.id_product, { through: { quantity: p.quantity } })
            })
        }

        return await this.getOrderById(newOrder.id_order)
    }

    //добавление товара в уже существующий заказ
    async addProduct(dto: AddProductDto) {
        //нахождение заказа по айди
        const order = await this.orderRepository.findByPk(dto.id_order)
        //нахождение товара из бд по названию
        const product = await this.productService.getProductByTitle(dto.title)
        //если такой заказ и товар существуют
        if (order && product) {
            //добавление этого товара в заказ (если он уже есть в заказе, то перезапишется)
            await order.$add('product', product.id_product, { through: { quantity: dto.quantity } })
            return dto
        }
        throw new HttpException('Заказ или товар не найдены', HttpStatus.NOT_FOUND)
    }

    //добавление этапа товара
    async addStageProduct(dto: AddStageDto) {
        //поиск айди статуса с названием "в производстве"
        const status = await this.statusService.getStatusByTitle('В производстве')
        //поиск заказа с этим статусом
        const order = await this.orderRepository.findOne({
            where: { id_status: status.id_status },
            include: { all: true }
        })
        //если такого заказа нет
        if (!order) {
            throw new HttpException('В данный момент никакие товары не производятся', HttpStatus.NOT_FOUND)
        }

        //поиск товара по коду
        const product = await this.productService.getProductByCode(dto.code)

        //проверка на наличие этого товара в заказе
        const presence = order.products.find(prod => prod.code === dto.code)
        if (!presence) {
            throw new HttpException(`Товара с таким кодом нет в заказе, который сейчас производится: ${dto.code}`, HttpStatus.NOT_FOUND)
        }

        //получение товара в заказе по коду и по айди заказа 
        const orderProduct = await this.orderProductsRepository.findOne({
            where: {
                id_order: order.id_order,
                id_product: product.id_product
            }
        })

        //получение массива со всеми стадиями производства товара
        const productStages = await this.productStagesRepository.findAll({
            where: { id_order_product: orderProduct.id_order_product }
        })

        //получение всех возможных стадий производства
        const stages = await this.stageService.getAllStages()
        //получение номера последнего этапа
        const maxStage = stages.reduce(function (prev, current) {
            if (+current.number > +prev.number) {
                return current
            } else {
                return prev
            }
        })

        const now = new Date()
        const newDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 5, now.getMinutes(), now.getSeconds(), now.getMilliseconds())

        //если массив с этапами пустой (товар начинает проходить первый этап производства)
        if (!productStages.length) {
            //получение первой стадии
            const st = await this.stageService.getStageByNumber(1)
            //добавление этого этапа в бд
            await orderProduct.$add('stage', st.id_stage, { through: { date_start: newDate } })
            return st
        }

        //получение текущего этапа (последнего на данный момент)
        const lastStage = productStages.reduce((prev, current) =>
            +current.id_product_stage > +prev.id_product_stage ? current : prev)

        //получение номера текущей стадии
        const currentStage = stages.find(st => st.id_stage === lastStage.id_stage)

        //если в последнем этапе не указана дата конца (он не закончен)
        if (!lastStage.date_end) {
            //добавляем текущую дату
            lastStage.date_end = newDate
            //сохраняем
            await lastStage.save()
            //если это последний этап
            if (currentStage.number === maxStage.number) {
                //товар произведен
                orderProduct.is_produced = true
                //сохранение
                await orderProduct.save()
                //если товар последний, то весь заказ будет готов
                return orderProduct
            }
            return lastStage
        }

        //если это не последний этап
        if (currentStage.number < maxStage.number) {
            //получение следующей стадии
            const st = await this.stageService.getStageByNumber(currentStage.number + 1)
            //добавление ее в бд
            await orderProduct.$add('stage', st.id_stage, { through: { date_start: new Date() } })
            return st
        }
        else {
            throw new HttpException(`Данный товар прошел все этапы производства: ${product.title}`, HttpStatus.BAD_REQUEST)
        }
    }

    //получение информации о том, производится ли сейчас какой-нибудь заказ
    async getProduce(title: string) {
        const status = await this.statusService.getStatusByTitle(title)
        const order = await this.orderRepository.findOne({ where: { id_status: status.id_status } })
        if (!order) {
            return false
        }
        return true
    }

    //получение всех заказов (включая товары в заказе)
    async getAllOrders() {
        const orders = await this.orderRepository.findAll({ include: { all: true } })
        return orders
    }

    //получение всех стадий товара
    async getStagesProduct(id: number) {
        let stages = await this.productStagesRepository.findAll({
            where: { id_order_product: id },
            include: { all: true }
        })

        stages = [...stages].sort((a, b) => a.id_stage - b.id_stage)
        return stages
    }

    //получение заказа по его айди, включая все товары в нем
    async getOrderById(id: number) {
        const order = await this.orderRepository.findOne({
            where: { id_order: id },
            include: { all: true }
        })
        if (!order) {
            throw new HttpException(`Заказ с таким id не найден: ${id}`, HttpStatus.NOT_FOUND)
        }
        return order
    }

    //получение товаров в заказе по его айди
    async getProductsByIdOrder(id: number) {
        const products = await this.orderProductsRepository.findAll({
            where: { id_order: id },
            include: { all: true }
        })
        if (!products) {
            throw new HttpException(`В заказе с таким id нет товаров: ${id}`, HttpStatus.NOT_FOUND)
        }
        return products
    }

    //обновление статуса заказа
    async updateStatus(id: number, dto: updateStatusDto) {
        //поиск введенного статуса
        const status = await this.statusService.getStatusByTitle(dto.title)
        //поиск заказа
        const order = await this.orderRepository.findByPk(id)
        if (!order) {
            throw new HttpException(`Заказ с таким id не найден: ${id}`, HttpStatus.NOT_FOUND)
        }
        //изменение статуса заказа на введенный
        order.id_status = status.id_status
        //сохранение
        order.save()
        return order
    }
}