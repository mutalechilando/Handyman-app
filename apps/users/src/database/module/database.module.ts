import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Setting } from "@users/entities/index";
import { DatabaseInitService } from "../service/database-init.service";
import { DatabaseService } from "../service/database.service";
import { JsonSeedService } from "../service/seed/json-seed.service";
import { TableSeedService } from "../service/seed/table-seed.service";

@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    providers: [TableSeedService],
    exports: [TableSeedService],
})
class TableSeedServiceModule { }

@Module({
    imports: [TypeOrmModule.forFeature([Setting])],
    providers: [JsonSeedService],
    exports: [JsonSeedService],
})
class JsonSeedServiceModule { }

@Module({
    imports: [TableSeedServiceModule, JsonSeedServiceModule],
    providers: [DatabaseService],
    exports: [DatabaseService],
})
class DatabaseServiceModule { }

@Module({
    imports: [DatabaseServiceModule],
    providers: [DatabaseInitService],
    exports: [DatabaseInitService],
})
export class DatabaseModule { }
