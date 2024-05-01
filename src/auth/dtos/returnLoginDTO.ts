import { ReturUserDTO } from "src/user/dto/UserDTO";

export interface ReturLoginDTO{
    user : ReturUserDTO,
    accessToken:string
}