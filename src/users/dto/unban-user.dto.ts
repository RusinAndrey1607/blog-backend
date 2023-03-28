import { IsNumber, IsString } from "class-validator"

export class UnBanUserDto{
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}