import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersTable1642426921102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "users",
          columns: [
            {
              name: "id",
              type: "uuid",
              isPrimary: true
            },
            {
              name: "name",
              type: "varchar",
            },
            {
              name: "username",
              type: "varchar",
              isUnique: true
            },
            {
              name: "email",
              type: "varchar",
            },
            {
              name: "password",
              type: "varchar",
            },
            {
              name: "isAdmin",
              type: "boolean",
              default: false
            },
            {
              name: "avatar_url",
              type: "varchar",
              isNullable: true
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()"
            }
          ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users");
    }

}
