import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { Repository } from 'typeorm'
import { UserEntity } from './interface/userEntity';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

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
                typeUser:userType
            }
        )
    }

    
    async getAllUser():Promise<UserEntity[]>{
        return this.userRepository.find()
    }

    
    async findUserByEmail(email:string):Promise<UserEntity>{
        const user = await this.userRepository.findOne(
            {where:{
                email,
            }}
        )

        if(!user){
            throw new Error("Usuario não encontrado")
        }

        return user
    }
}
