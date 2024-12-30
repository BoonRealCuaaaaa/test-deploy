import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGenerate1735216023310 implements MigrationInterface {
    name = 'AutoGenerate1735216023310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Assistant_Configs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "values" jsonb NOT NULL, "assistantId" uuid, CONSTRAINT "REL_cc290bee493f724c223ef199c4" UNIQUE ("assistantId"), CONSTRAINT "PK_63db5a9f0fbf6084324a80d4aea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."Integration_Platforms_type_enum" AS ENUM('Zendesk', 'Pancake', 'Zohodesk', 'Tiktokshop')`);
        await queryRunner.query(`CREATE TABLE "Integration_Platforms" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."Integration_Platforms_type_enum" NOT NULL, "domain" text NOT NULL, "isEnable" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assistantId" uuid, CONSTRAINT "PK_bce9477a4e230d244dd2b3a79a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Rules" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "isEnable" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "aiAssistantId" uuid, CONSTRAINT "PK_6b3823a21cc6c08840ab175f02c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_3c3ab3f49a87e6ddb607f3c4945" UNIQUE ("email"), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "AI_Assistants" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "jarvisAssistantId" uuid, "jarvisKnowledgeId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_6b6aaa013c33945b97748861fec" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Response_Templates" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text NOT NULL, "template" text NOT NULL, "isActive" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "assistantId" uuid, CONSTRAINT "PK_40310ba0217955a61e1ea123e21" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Assistant_Configs" ADD CONSTRAINT "FK_cc290bee493f724c223ef199c41" FOREIGN KEY ("assistantId") REFERENCES "AI_Assistants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Integration_Platforms" ADD CONSTRAINT "FK_c173804c659ecc4c30256cfd777" FOREIGN KEY ("assistantId") REFERENCES "AI_Assistants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Rules" ADD CONSTRAINT "FK_e91202f58602792e7ab8a28e6fd" FOREIGN KEY ("aiAssistantId") REFERENCES "AI_Assistants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "AI_Assistants" ADD CONSTRAINT "FK_e7a7dd3b8710f8065e117500869" FOREIGN KEY ("ownerId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Response_Templates" ADD CONSTRAINT "FK_64883d38c4129fb12407cae09cb" FOREIGN KEY ("assistantId") REFERENCES "AI_Assistants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Response_Templates" DROP CONSTRAINT "FK_64883d38c4129fb12407cae09cb"`);
        await queryRunner.query(`ALTER TABLE "AI_Assistants" DROP CONSTRAINT "FK_e7a7dd3b8710f8065e117500869"`);
        await queryRunner.query(`ALTER TABLE "Rules" DROP CONSTRAINT "FK_e91202f58602792e7ab8a28e6fd"`);
        await queryRunner.query(`ALTER TABLE "Integration_Platforms" DROP CONSTRAINT "FK_c173804c659ecc4c30256cfd777"`);
        await queryRunner.query(`ALTER TABLE "Assistant_Configs" DROP CONSTRAINT "FK_cc290bee493f724c223ef199c41"`);
        await queryRunner.query(`DROP TABLE "Response_Templates"`);
        await queryRunner.query(`DROP TABLE "AI_Assistants"`);
        await queryRunner.query(`DROP TABLE "Users"`);
        await queryRunner.query(`DROP TABLE "Rules"`);
        await queryRunner.query(`DROP TABLE "Integration_Platforms"`);
        await queryRunner.query(`DROP TYPE "public"."Integration_Platforms_type_enum"`);
        await queryRunner.query(`DROP TABLE "Assistant_Configs"`);
    }

}
