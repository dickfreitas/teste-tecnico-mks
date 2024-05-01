import { MigrationInterface, QueryRunner } from "typeorm";

 export class CreateTableFilms1714530687638 implements MigrationInterface {

     public async up(queryRunner: QueryRunner): Promise<void> {
         queryRunner.query(`
             CREATE TABLE public.films(
                 id SERIAL PRIMARY KEY,
                 name VARCHAR NOT NULL,
                 release_year int NOT NULL,
                 category VARCHAR NOT NULL,
                 assessment int NOT NULL,
                 user_id integer NOT NULL,
                 foreign key (user_id) references public.user(id)
                 
             );
         `)
     }

     public async down(queryRunner: QueryRunner): Promise<void> {
         queryRunner.query(`DROP TABLE films`)
     }

 }
