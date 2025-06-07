import { Injectable } from "@nestjs/common";
import { LoggerFactory } from "@repo/logger/build";
import * as fs from "fs";
import * as path from "path";
import { DataSource } from "typeorm";
import { JsonSeedService } from "./seed/json-seed.service";
import { TableSeedService } from "./seed/table-seed.service";

const logger = LoggerFactory.getLogger();

@Injectable()
export class DatabaseService {
    constructor(
        private tableSeedService: TableSeedService,
        private jsonSeedService: JsonSeedService,
    ) { }

    async applyPatches(dataSource: DataSource): Promise<void> {
        await this.createSchemaIfNotExists(
            dataSource,
            "sys",
            "holds system wide information",
        );

        await this.createSchemaIfNotExists(
            dataSource,
            "public",
            "holds public tables",
        );

        await this.createSchemaIfNotExists(
            dataSource,
            "ref",
            "holds referential data",
        );

        await this.initSettingTable(dataSource);

        await this.runPatches(dataSource);
    }

    private async runPatches(dataSource: DataSource): Promise<void> {
        await this.tableSeedService.runPatches(dataSource);
        await this.jsonSeedService.runPatches(dataSource);
    }

    private async createSchemaIfNotExists(
        dataSource: DataSource,
        schemaName: string,
        comment?: string,
    ): Promise<void> {
        const queryRunner = dataSource.createQueryRunner();
        try {
            const schemaExists = await queryRunner.hasSchema(schemaName);

            if (!schemaExists) {
                await queryRunner.createSchema(schemaName, true);

                if (comment) {
                    const commentQuery = `COMMENT ON SCHEMA ${schemaName} IS '${comment}'`;
                    await dataSource.query(commentQuery);
                }
            } else {
                logger.warn(`Schema ${schemaName} already exists.`);
            }
        } catch (err) {
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    private async initSettingTable(dataSource: DataSource): Promise<void> {
        if (!(await this.tableExists(dataSource, "sys", "setting"))) {
            const sqlText = await fs.promises.readFile(
                path.resolve(
                    __dirname,
                    "../../engine/sql/tables/sys/system.1.sql",
                ),
                {
                    encoding: "utf-8",
                },
            );

            await dataSource.transaction(async (manager) => {
                await manager.query(sqlText);
            });
        }
    }

    private async tableExists(
        dataSource: DataSource,
        schemaName: string,
        tableName: string,
    ): Promise<boolean> {
        const queryRunner = dataSource.createQueryRunner();

        try {
            const tableExists = await queryRunner.hasTable(
                `${schemaName}.${tableName}`,
            );

            return tableExists;
        } catch (err) {
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
