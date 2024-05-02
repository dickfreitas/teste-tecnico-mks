import { ApiProperty } from "@nestjs/swagger";

export class AddFilmsDTO{
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    user_id: number;

    @ApiProperty()
    release_year: number;

    @ApiProperty()
    category: string;

    @ApiProperty()
    assessment: string;
}