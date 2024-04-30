import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { UserService } from './user.service';
import { UserEntity } from './interface/userEntity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(
        @Body() createUser:createUserDTO
    ):Promise<UserEntity>{
       return this.userService.createUser(createUser)
    }

    @Get()
    async getAllUser():Promise<UserEntity[]>{
        return this.userService.getAllUser()
    }
}
