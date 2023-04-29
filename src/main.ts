import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { join } from 'path'

async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create<NestExpressApplication>(AppModule)

    app.useStaticAssets(join(__dirname, '..', 'public'))
    app.setBaseViewsDir(join(__dirname, '..', 'views'))
    app.setViewEngine('hbs')

    const config = new DocumentBuilder()
        .setTitle('NEST JS BACKEND')
        .setDescription('Документация REST API')
        .setVersion('1.0.0')
        .addTag('Документация')
        .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/docs', app, document)

    app.enableCors()

    await app.listen(PORT, () => console.log(`Server started on port: ${PORT} 🚀 🗿🗿🗿`))
}

start()