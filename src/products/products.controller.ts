import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductsService } from './products.service'
import { Product } from './products.model'

@ApiTags('Товары')
@Controller('api/products')
export class ProductsController {

    constructor(private productsService: ProductsService) { }

    @ApiOperation({ summary: 'Добавление нового товара' })
    @ApiResponse({ status: 200, type: [Product] })
    @Post()
    create(@Body() productDto: CreateProductDto) {
        return this.productsService.createProduct(productDto)
    }

    @ApiOperation({ summary: 'Получить все товары' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get()
    getAll() {
        return this.productsService.getAllProducts()
    }

    @ApiOperation({ summary: 'Получить товар по названию' })
    @ApiResponse({ status: 200, type: [Product] })
    @Get('/:title')
    getByTitle(@Param('title') title: string) {
        return this.productsService.getProductByTitle(title)
    }
}