import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "@notifications/database/index";
import { NotificationModule } from "@notifications/notification/index";
import { AppController } from "../controller/app.controller";

@Module({
    imports: [DatabaseModule, TerminusModule, TypeOrmModule, NotificationModule],
    controllers: [AppController],
})
export class AppModule { }
