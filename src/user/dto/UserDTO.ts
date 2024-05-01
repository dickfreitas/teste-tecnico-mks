import { use } from "passport";
import { UserEntity } from "../interface/userEntity";

export interface createUserDTO{
    name: string;
    email:string;
    password:string;
    typeUser:string
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