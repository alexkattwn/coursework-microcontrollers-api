import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateProductDto } from './dto/create-product.dto'
import { Product } from './products.model'

@Injectable()
export class ProductsService {

    constructor(@InjectModel(Product) private productRepository: typeof Product) { }

    //создание нового товара
    async createProduct(dto: CreateProductDto) {
        const product = await this.productRepository.findOne({ where: { title: dto.title } })
        if (product) {
            throw new HttpException(`Товар с таким названием уже существует: ${dto.title}`, HttpStatus.BAD_REQUEST)
        }

        const code = await this.productRepository.findOne({ where: { code: dto.code } })
        if (code) {
            throw new HttpException(`Товар с таким кодом уже существует: ${dto.code}`, HttpStatus.BAD_REQUEST)
        }

        const newProduct = await this.productRepository.create(dto)
        return newProduct
    }

    //получение всех товаров
    async getAllProducts() {
        const products = await this.productRepository.findAll()
        return products
    }

    //получение товара по назанию
    async getProductByTitle(title: string) {
        const product = await this.productRepository.findOne({ where: { title } })
        if (!product) {
            throw new HttpException(`Товар с таким названием не найден: ${title}`, HttpStatus.NOT_FOUND)
        }
        return product
    }

    //получение товара по коду
    async getProductByCode(code: string) {
        const product = await this.productRepository.findOne({ where: { code } })
        if (!product) {
            throw new HttpException(`Товар с таким кодом не найден: ${code}`, HttpStatus.NOT_FOUND)
        }
        return product
    }
}