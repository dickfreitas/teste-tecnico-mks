import { use } from "passport"
import { UserEntity } from "src/user/interface/userEntity"
import { UserTokenDTO } from "./UserTokenDTO";

export class TokenDTO{
    id:number
    typeUser:number

    constructor(user:UserTokenDTO){
        this.id = user.id;
        this.typeUser = user.typeUser
    }
}