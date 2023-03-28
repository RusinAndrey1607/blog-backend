import { IsNumber, IsString } from "class-validator"

export class AddRoleDto{
    @IsString({message:"Role value must be as string"})
    readonly value:string
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}