import { FilmsEntities } from 'src/films/entities/filmesEntities';
import {Entity , Column , PrimaryGeneratedColumn , OneToMany } from 'typeorm'


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
    @Column({name:'type_user' , nullable:false})
    type_user:number;

    @OneToMany(() => FilmsEntities, (filmes) => filmes.user)
    films?: FilmsEntities[];
    
}

