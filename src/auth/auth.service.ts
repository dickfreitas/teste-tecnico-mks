import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/userEntity';
import { LoginDTO } from './dtos/loginDTO';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'
import { ReturnLoginDTO } from './dtos/returnLoginDTO';
import { ReturnUserDTO } from 'src/user/dto/UserDTO';
import { JwtService } from '@nestjs/jwt';
import { TokenDTO } from './dtos/tokenDTO';
import { UserTokenDTO } from './dtos/UserTokenDTO';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService:UserService,
        private readonly jwtService : JwtService
    ){}

    

    async login(loginDTO: LoginDTO): Promise<ReturnLoginDTO> {
        const user: UserTokenDTO | undefined = await this.userService
          .findUserByEmail(loginDTO.email)
          .catch(() => undefined);
        const passwordIsValid = await bcrypt.compare(loginDTO.password, user?.password);

        if(!user || !passwordIsValid){
            throw new NotAcceptableException("Email or password invalid")
        }
        
        return {
            accessToken: this.jwtService.sign({...new TokenDTO(user)})
            ,user:new ReturnUserDTO(user)}
        }
}
