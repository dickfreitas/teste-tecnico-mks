import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1714501353362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public."user" (
                id SERIAL PRIMARY KEY NOT NULL,
                name VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                type_user int NOT NULL
                
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`drop table "user"`)
    }

}
