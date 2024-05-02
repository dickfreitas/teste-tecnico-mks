import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './dtos/loginDTO';

import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { ReturnLoginDTO } from './dtos/returnLoginDTO';
import { ApiBody } from '@nestjs/swagger';
import { LoginSwaggerDTO } from './authSwaggerDTOS/LoginSwaggerDTO';

@Controller('login')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly authService:AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post()
    @ApiBody({type:LoginSwaggerDTO})
    async login(@Body() loginDTO:LoginDTO):Promise<ReturnLoginDTO>{
        return this.authService.login(loginDTO)
    }
}
