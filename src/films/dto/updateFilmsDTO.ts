import { IsOptional, IsString } from "class-validator";

export class updateFilmsDTO{
    @IsString()
    @IsOptional()
    category?: string

    @IsOptional()
    release_year?: number
    

    @IsString()
    @IsOptional()
    assessment?: string
    



}