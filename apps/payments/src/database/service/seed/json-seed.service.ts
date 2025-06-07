import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LoggerFactory } from "@repo/logger/build";
import { DataSource, JsonPatch, SeedService } from "@repo/seeder/build";
import { Setting } from "@payments/entities/index";
import { Repository } from "typeorm";

const logger = LoggerFactory.getLogger();

@Injectable()
export class JsonSeedService extends SeedService {
    patchKey = "json_patch_level";

    constructor(
        @InjectRepository(Setting)
        private settingRepository: Repository<Setting>,
    ) {
        super();
    }

    async runPatches(dataSource: DataSource): Promise<void> {
        for (const patch of patches) {
            await this.runJsonPatch(dataSource, patch);
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

const patches: JsonPatch[] = []
