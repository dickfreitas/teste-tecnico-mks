import { Inject, Injectable, MethodNotAllowedException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createUserDTO } from './dto/UserDTO';
import { UserEntity } from './entities/userEntity';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { UserType } from './enum/user-type.enum';
import { updateUserDTO } from './dto/updateUserDTO';
import { UserRepository } from './repository/user-repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { use } from 'passport';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository:UserRepository,
        @Inject(CACHE_MANAGER)
        private cacheManager:Cache

    ){}

    async createUser(createUserDTO : createUserDTO , userType:UserType):Promise<UserEntity>{
        //CRIPTOGRAFIA DA SENHA DO USUARIO 
        const password = await bcrypt.hash(createUserDTO.password , 10);
        const email = await this.userRepository.find({where: {email: createUserDTO.email}})

        if(email){
            throw new UnauthorizedException("Email ja cadastrado")
        }
        return this.userRepository.save(
            {
                ...createUserDTO,
                password:password,
                type_user:userType
            }
        )
    }

    
    async getAllUser():Promise<any>{


        let users : UserEntity[] | undefined = await this.cacheManager.get('users')
        
        
        if (!users) {
            users = await this.userRepository.find()
            if (users) {
                const set = await this.cacheManager.set("users", users,  200 );

            } else {
                throw new NotFoundException("User not found");
            }
            
        }
        return users
        
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

    async findFilmsByUser(id: number): Promise<UserEntity> {
        if (!id) {
            throw new NotFoundException("Id user not found");
        }
    
        let film: UserEntity = await this.cacheManager.get("films");
        if (!film) {
            film = await this.userRepository.findOne({
                where: { id },
                relations: ['films']
            });
            if (film) {
                const set = await this.cacheManager.set("films", film,  200 );

            } else {
                throw new NotFoundException("User not found");
            }
            
        }
        return film;
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
