import { ApiProperty } from "@nestjs/swagger"
export class AddStageDto {
    @ApiProperty({ example: '123sds324', description: 'Код товара' })
    readonly code: string
}