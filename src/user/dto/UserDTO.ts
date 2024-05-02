import { use } from "passport";
import { UserEntity } from "../entities/userEntity";


export class createUserDTO{

    name: string;


    email:string;


    password:string;


    type_user:number
}

export class ReturnUserDTO{
    name: string;
    email:string

    constructor(userEntity : UserEntity){
        this.name=userEntity.name;
        this.email=userEntity.email;

    }
}