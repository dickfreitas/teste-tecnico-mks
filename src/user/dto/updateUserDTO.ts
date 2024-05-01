import { IsOptional, IsString } from "class-validator";

export class updateUserDTO{
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?:string;

    @IsString()
    @IsOptional()
    password?:string;
}