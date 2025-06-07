import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerFactory } from "@repo/logger";
import { SeedService } from "@repo/seeder";
import { SqlPatch } from "@repo/seeder/build/types";
import { Setting } from "@notifications/entities/index";
import * as path from "path";
import { DataSource, Repository } from "typeorm";

const logger = LoggerFactory.getLogger();

@Injectable()
export class TableSeedService extends SeedService {
    patchKey = "table_patch_level";

    constructor(
        @InjectRepository(Setting)
        private settingRepository: Repository<Setting>,
    ) {
        super();
    }

    async runPatches(dataSource: DataSource): Promise<void> {
        for (const patch of patches) {
            await this.runSqlPatch(dataSource, patch);
        }
    }

    async getPatchLevel(): Promise<number> {
        const lookup = await this.settingRepository.findOneBy({
            key: this.patchKey,
        });

        return lookup?.value ? parseInt(lookup.value) : -1;
    }

    async setPatchLevel(value: number): Promise<void> {
        const entry = new Setting();

        entry.key = this.patchKey;
        entry.value = value.toString();

        await this.settingRepository.save(entry);

        logger.info(`updated ${this.patchKey} to ${value}`);
    }
}

const patches: SqlPatch[] = [
    {
        level: 1,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/ref/delivery_status.1.sql",
        ),
        isFile: true,
    },
    {
        level: 2,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/ref/notification_status.1.sql",
        ),
        isFile: true,
    },
    {
        level: 3,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/ref/notification_channel.1.sql",
        ),
        isFile: true,
    },
    {
        level: 4,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/public/tenant.1.sql",
        ),
        isFile: true,
    },
    {
        level: 5,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/public/template.1.sql",
        ),
        isFile: true,
    },
    {
        level: 6,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/public/notification.1.sql",
        ),
        isFile: true,
    },
    {
        level: 7,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/public/delivery_attempt.1.sql",
        ),
        isFile: true,
    },
    {
        level: 8,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/public/notification_audit.1.sql",
        ),
        isFile: true,
    },
    {
        level: 9,
        sqlSource: path.resolve(
            __dirname, "../../../engine/sql/tables/public/user_preference.1.sql",
        ),
        isFile: true,
    },
]
