import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class updateUserDTO{
    @IsString()
    @IsOptional()
    @ApiProperty()
    name?: string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    email?:string;

    @IsString()
    @ApiProperty()
    @IsOptional()
    password?:string;
}