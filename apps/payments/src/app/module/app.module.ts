import { DatabaseModule } from "@payments/database/index";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "../controller/app.controller";
import { Module } from "@nestjs/common";

@Module({
    imports: [DatabaseModule, TerminusModule, TypeOrmModule],
    controllers: [AppController],
})
export class AppModule { }
