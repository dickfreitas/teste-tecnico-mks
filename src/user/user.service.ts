import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { Repository } from 'typeorm'
import { UserEntity } from './interface/userEntity';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:Repository<UserEntity>

    ){}

    async createUser(createUserDTO : createUserDTO):Promise<UserEntity>{
        //CRIPTOGRAFIA DA SENHA DO USUARIO 
        const password = await bcrypt.hash(createUserDTO.password , 10);

        return this.userRepository.save(
            {
                ...createUserDTO,
                password:password,
            }
        )
    }

    async getAllUser():Promise<UserEntity[]>{
        return this.userRepository.find()
    }
}
