import {Entity , Column , PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'user'})
export class UserEntity{
    @PrimaryGeneratedColumn('rowid')
    id:number;
    @Column({name:'name' , nullable:false})
    name: string;
    @Column({name:'email' , nullable:false})
    email:string;
    @Column({name:'password' , nullable:false})
    password:string;
}

