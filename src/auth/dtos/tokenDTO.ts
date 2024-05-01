
import { UserTokenDTO } from "./UserTokenDTO";

export class TokenDTO{
    id:number
    type_user:number

    constructor(user:UserTokenDTO){
        this.id = user.id;
        this.type_user = user.type_user
    }
}