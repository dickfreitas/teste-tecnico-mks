import { use } from "passport";
import { UserEntity } from "../entities/userEntity";

export interface createUserDTO{
    name: string;
    email:string;
    password:string;
    type_user:number
}

export class ReturUserDTO{
    id:number;
    name: string;
    email:string;
    password:string;

    constructor(userEntity : UserEntity){
        this.id=userEntity.id;
        this.name=userEntity.name;
        this.email=userEntity.email;
        this.password=userEntity.password

    }
}