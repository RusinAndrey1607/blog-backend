import { IsNumber, IsString } from "class-validator"

export class BanUserDto{
    @IsString({message:"BanReason value must be as string"})
    readonly banReason:string
    @IsNumber({},{message:"UserId must be a number"})
    readonly userId:number
}