import { UserEntity } from 'src/user/entities/userEntity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'films' })
export class FilmsEntities {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'user_id', nullable: false })
    user_id: number;

    @Column({ name: 'release_year', nullable: false })
    release_year: number;

    @Column({ name: 'category', nullable: false })
    category: string;

    @Column({ name: 'assessment', nullable: false })
    assessment: string;

    @ManyToOne(() => UserEntity, (user) => user.films)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user?: UserEntity;
}
