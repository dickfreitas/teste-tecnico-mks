import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class updateFilmsDTO{
    @IsString()
    @IsOptional()
    @ApiProperty()
    category?: string

    @IsOptional()
    @ApiProperty()
    release_year?: number
    

    @IsString()
    @IsOptional()
    @ApiProperty()
    assessment?: string
    



}