import { ApiProperty } from "@nestjs/swagger";

export class AddUserSwaggerDTO{
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    email:string;

    @ApiProperty()
    password:string;

    @ApiProperty()
    type_user:number
}

export class UserFilmsSwaggerDTO{
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password:string;
    @ApiProperty()
    type_user: number
    @ApiProperty()
    films: []
}