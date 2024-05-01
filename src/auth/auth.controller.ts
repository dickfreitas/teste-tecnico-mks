import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDTO } from './dtos/loginDTO';

import { UserService } from 'src/user/user.service';
import { ReturUserDTO } from 'src/user/dto/UserDTO';
import { privateDecrypt } from 'crypto';
import { AuthService } from './auth.service';
import { ReturLoginDTO } from './dtos/returnLoginDTO';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService:UserService,
        private readonly authService:AuthService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post()
    async login(@Body() loginDTO:LoginDTO):Promise<ReturLoginDTO>{
        return this.authService.login(loginDTO)
    }
}
