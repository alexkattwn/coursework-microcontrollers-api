import { Get, Controller, Render } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Главная страница')
@Controller()
export class AppController {

    @Get()
    @Render('index')
    root() {
        return { message: 'Добро пожаловать в АPI' };
    }
}