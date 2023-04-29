import { ApiProperty } from "@nestjs/swagger"

export class updateStatusDto {
    @ApiProperty({ example: 'В производстве', description: 'Наименование статуса' })
    readonly title: string
}