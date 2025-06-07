import { Injectable, OnModuleInit } from "@nestjs/common";
import { LoggerFactory } from "@repo/logger/";
import { AppDataSource, config } from "@users/config/index";
import { DataSource } from "typeorm";
import { DatabaseService } from "./database.service";

const logger = LoggerFactory.getLogger();

@Injectable()
export class DatabaseInitService implements OnModuleInit {
    private dataSource: DataSource;

    constructor(private readonly databaseService: DatabaseService) {
        this.dataSource = AppDataSource;
    }

    async onModuleInit() {
        try {
            await this.initializeDatabase();

            await this.applyPatches(this.dataSource);

            logger.info("Finished applying patches");
        } catch (err) {
            logger.error(`Failed to initialize database: ${err}`);

            await this.destroyDatabase();

            throw err;
        }
    }

    private async initializeDatabase() {
        const isDBInitialized = await this.dataSource.initialize();

        if (!isDBInitialized) {
            throw new Error("Failed to initialize database");
        }

        logger.info(`Successfully connected to database: ${config.DB_NAME} `);
    }

    private async destroyDatabase() {
        await this.dataSource.destroy();

        logger.info(`Successfully destroyed database: ${config.DB_NAME}`);
    }

    private async applyPatches(dataSource: DataSource) {
        try {
            logger.info("Applying patches to database...");

            await this.databaseService.applyPatches(dataSource);

            logger.info("Successfully applied patches");
        } catch (err) {
            logger.error(`Failed to apply patches: ${err}`);

            throw err;
        }
    }
}
