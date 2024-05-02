import { ReturnUserDTO } from "src/user/dto/UserDTO";

export interface ReturnLoginDTO{
    user : ReturnUserDTO,
    accessToken:string
}