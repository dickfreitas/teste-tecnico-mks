import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { UserService } from './user.service';
import { UserEntity } from './entities/userEntity';
import { UserType } from './enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { updateUserDTO } from './dto/updateUserDTO';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(
        @Body() createUser:createUserDTO
    ):Promise<UserEntity>{
       return this.userService.createUser(
        createUser,
        UserType.User)
    }

    @Post("/admin")
    async createUserAdmin(
        @Body() createUser:createUserDTO
    ):Promise<UserEntity>{
       return this.userService.createUser(
        createUser,
        UserType.Admin)
    }

    
    @Get()
    @Roles(UserType.Admin)
    async getAllUser():Promise<UserEntity[]>{
        return this.userService.getAllUser()
    }

    @Get('/:userId')
    @Roles(UserType.User)
    async filmsByUser(@Param('userId') userId: number){
        return this.userService.getFilmsByUser(userId);
    }


    @Patch('/:userId')
    @Roles(UserType.User)
    async update(@Body() updateUser: updateUserDTO, @Param("userId") userId:number){
        return this.userService.updatePassword(updateUser, userId)
    }

    @Roles(UserType.Admin)
    @Delete('/:userId')
    async delete(@Param("userId") userId:number){
        return this.userService.deleteFilms(userId)
    }
}
