import { ApiProperty } from "@nestjs/swagger"
import { IsNumber } from "class-validator"

export class UnBanUserDto{
    @ApiProperty({ example: 1, description: 'userId' })
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}