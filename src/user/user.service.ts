import { Injectable } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { User } from './interface/userInterface';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

    private users:User[] = []
    async createUser(createUserDTO : createUserDTO):Promise<User>{
        //CRIPTOGRAFIA DA SENHA DO USUARIO 
        const password = await bcrypt.hash(createUserDTO.password , 10);
        const newUser:User = {
            ...createUserDTO,
            id:this.users.length +1,
            password:password,
        }
        this.users.push(newUser)
        return newUser
    }

    async getAllUser():Promise<User[]>{
        return this.users
    }
}
