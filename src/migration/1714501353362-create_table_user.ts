import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUser1714501353362 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE public."user" (
                id SERIAL PRIMARY KEY,
                name VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                typeUser int NOT NULL
                
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`drop table "user"`)
    }

}
