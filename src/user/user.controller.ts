import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { UserService } from './user.service';
import { UserEntity } from './interface/userEntity';
import { UserType } from './enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(
        @Body() createUser:createUserDTO
    ):Promise<UserEntity>{
       return this.userService.createUser(createUser,UserType.User)
    }

    @Roles(UserType.User)
    @Get()
    @UsePipes(ValidationPipe)
    async getAllUser():Promise<UserEntity[]>{
        return this.userService.getAllUser()
    }
}
