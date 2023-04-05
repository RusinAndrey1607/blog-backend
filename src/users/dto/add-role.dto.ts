import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class AddRoleDto{
    @ApiProperty({ example: 'ADMIN', description: 'Only for ADMIN' })
    @IsString({message:"Role value must be as string"})
    readonly value:string
    @ApiProperty({ example: 1, description: 'userId' })
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}