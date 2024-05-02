import { ApiProperty } from "@nestjs/swagger";

export class LoginSwaggerDTO{
    @ApiProperty()
    email: string
    @ApiProperty()
    password: string
}