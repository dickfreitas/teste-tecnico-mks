import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { Repository } from 'typeorm'
import { UserEntity } from './entities/userEntity';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';
import { updateUserDTO } from './dto/updateUserDTO';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>

    ){}

    async createUser(createUserDTO : createUserDTO , userType:UserType):Promise<UserEntity>{
        //CRIPTOGRAFIA DA SENHA DO USUARIO 
        const password = await bcrypt.hash(createUserDTO.password , 10);

        return this.userRepository.save(
            {
                ...createUserDTO,
                password:password,
                type_user:userType
            }
        )
    }

    
    async getAllUser():Promise<UserEntity[]>{
        return this.userRepository.find()
    }

    
    async findUserByEmail(email:string):Promise<UserEntity>{
        if(!email){
            throw new MethodNotAllowedException('Enter a valid id')
        }
        const user = await this.userRepository.findOne(
            {where:{
                email,
            }}
        )

        if(!user){
            throw new NotFoundException("User not Found")
        }

        return user
    }


    async findFilmsByUser(id : number):Promise<UserEntity>{
        if(!id){
            throw new NotFoundException("Id user not found")
        }
        return this.userRepository.findOne({
            where:{
                id
            },
            relations: ['films']
        })
    }

    async updatePassword(updateUser:updateUserDTO , userId:number):Promise<UserEntity>{
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if(!user){
            throw new NotFoundException("Film not found")
        }   

        if(updateUser.password){
            const password = await bcrypt.hash(updateUser.password , 10);
            user.password = password
        }

        return this.userRepository.save(user)
    }

    async deleteUser(userId: number):Promise<void>{
        if(!userId){
            throw new MethodNotAllowedException('Enter a valid id')
        }
        
        const user = await this.userRepository.findOne({where:{id:userId}})

        if(!user){
            throw new NotFoundException("Film not found")
        }

        await this.userRepository.delete(user)
    }
}
