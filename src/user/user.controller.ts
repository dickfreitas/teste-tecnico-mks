import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { UserService } from './user.service';
import { UserEntity } from './entities/userEntity';
import { UserType } from './enum/user-type.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { updateUserDTO } from './dto/updateUserDTO';
import { ApiBearerAuth, ApiBody, ApiHeader } from '@nestjs/swagger';
import { AddUserSwaggerDTO, UserFilmsSwaggerDTO } from './swagger-dtos/UserSwagger.dtos';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
    @ApiBody({type: AddUserSwaggerDTO})
    async createUser(
        @Body() createUser:createUserDTO
    ):Promise<UserEntity>{
       return this.userService.createUser(
        createUser,
        UserType.User)
    }

    @Post("/admin")
    @ApiBody({type: AddUserSwaggerDTO})
    async createUserAdmin(
        @Body() createUser:createUserDTO
    ):Promise<UserEntity>{
       return this.userService.createUser(
        createUser,
        UserType.Admin)
    }

    @Get("/hello")
    async helloWorld(){
        return ("Hello World")
    }

    @Get()
    @Roles(UserType.Admin)
    @ApiHeader({
        name: 'Acess-Token User Admin',
        description: 'Acess-Token',
      })
    @ApiBody({type: AddUserSwaggerDTO})
    async getAllUser():Promise<UserEntity[]>{
        return this.userService.getAllUser()
    }

    @Get('films/:userId')
    @Roles(UserType.User)
    @ApiBody({type:UserFilmsSwaggerDTO})
    @ApiHeader({
        name: 'Acess-Token User',
        description: 'Acess-Token',
      })
    async filmsByUser(@Param('userId') userId: number){
        return this.userService.findFilmsByUser(userId);
    }


    @Patch('/:userId')
    @Roles(UserType.User)
    @ApiBody({type:updateUserDTO})
    @ApiHeader({
        name: 'Acess-Token User ',
        description: 'Acess-Token',
      })
    async update(@Body() updateUser: updateUserDTO, @Param("userId") userId:number){
        return this.userService.updatePassword(updateUser, userId)
    }

    @Roles(UserType.Admin)
    @Delete('/:userId')
    @ApiHeader({
        name: 'Acess-Token User Admin',
        description: 'Acess-Token',
      })

    async delete(@Param("userId") userId:number){
        return this.userService.deleteUser(userId)
    }
}
