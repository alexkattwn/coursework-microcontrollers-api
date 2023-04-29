import { ApiProperty } from "@nestjs/swagger"

export class CreateStatusDto {
    @ApiProperty({ example: 'В производстве', description: 'Наименование статуса' })
    readonly title: string

    constructor(title: string) {
        this.title = title
    }
}