import { Body, Controller, Get, Post } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { UserService } from './user.service';
import { User } from './interface/userInterface';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(
        @Body() createUser:createUserDTO
    ):Promise<User>{
       return this.userService.createUser(createUser)
    }

    @Get()
    async getAllUser():Promise<User[]>{
        return this.userService.getAllUser()
    }
}
