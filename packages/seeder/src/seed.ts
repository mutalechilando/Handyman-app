import { LoggerFactory } from "@repo/logger";
import fs from "fs";
import { DataSource, JsonPatch, SqlPatch } from "./types";

const logger = LoggerFactory.getLogger();

export abstract class SeedService {
    abstract getPatchLevel(): Promise<number>;
    abstract setPatchLevel(value: number): Promise<void>;
    abstract runPatches(dataSource: DataSource): Promise<void>;

    /**
     * Executes a patch if the current patch level is less than the patch level provided.
     *
     * @param {DataSource} dataSource - The data source to run the patch on.
     * @param {SqlPatch} patch - The patch object containing information about the patch.
     * @return {Promise<void>}
     */
    protected async runSqlPatch(
        dataSource: DataSource,
        patch: SqlPatch,
    ): Promise<void> {
        try {
            const currentPatchLevel = await this.getPatchLevel();

            if (currentPatchLevel < patch.level) {
                const sqlText = await this.getSqlText(
                    patch.sqlSource,
                    patch.isFile,
                );

                await dataSource.transaction(async (manager) => {
                    await manager.query(sqlText);
                    await this.setPatchLevel(patch.level);
                });
            } else {
                return;
            }
        } catch (err) {
            logger.error(`patch failed to run: ${err}`);
            throw err;
        }
    }

    /**
     * Executes a JSON patch if the current patch level is less than the patch level provided.
     *
     * @param {DataSource} dataSource - The data source to run the patch on.
     * @param {JsonPatch} patch - The JSON patch object containing information about the patch.
     * @return {Promise<void>}
     */
    protected async runJsonPatch(
        dataSource: DataSource,
        patch: JsonPatch,
    ): Promise<void> {
        try {
            const currentPatchLevel = await this.getPatchLevel();

            if (currentPatchLevel < patch.level) {
                const jsonText = await this.getJsonText(
                    patch.jsonSource,
                    patch.isFile,
                );

                await dataSource.transaction(async (manager) => {
                    await manager.getRepository(patch.table).save(jsonText);
                    await this.setPatchLevel(patch.level);
                });
            } else {
                return;
            }
        } catch (err) {
            logger.error(`patch failed to run: ${err}`);
            throw err;
        }
    }

    /**
     * Retrieves the SQL text from the given SQL source.
     *
     * @param {string} sqlSource - The source of the SQL text. It can be a file path or the SQL text itself.
     * @param {boolean} [isFile=false] - Indicates whether the SQL source is a file path or not. Defaults to false.
     * @return {Promise<string>} - A promise that resolves to the SQL text.
     * @throws {Error} - If there is an error reading the patch file.
     */
    private async getSqlText(
        sqlSource: string,
        isFile: boolean = false,
    ): Promise<string> {
        try {
            if (isFile) {
                const sqlText = await fs.promises.readFile(sqlSource, "utf-8");

                return sqlText;
            }

            return sqlSource;
        } catch (err) {
            throw new Error(`failed to read sql source: ${sqlSource}: ${err}`);
        }
    }

    /**
     * Retrieves JSON text from a given source.
     *
     * @param {string} jsonSource - The source of the JSON text. It can be a file path or the JSON text itself.
     * @param {boolean} [isFile=false] - Indicates whether the JSON source is a file path or not. Defaults to false.
     * @return {Promise<any[]>} - A promise that resolves to an array of parsed JSON objects.
     * @throws {Error} - If there is an error reading the JSON patch file.
     */
    private async getJsonText(
        jsonSource: string,
        isFile: boolean = false,
    ): Promise<any[]> {
        try {
            if (isFile) {
                const jsonText = await fs.promises.readFile(
                    jsonSource,
                    "utf-8",
                );

                return JSON.parse(jsonText);
            }

            return JSON.parse(jsonSource);
        } catch (err) {
            throw new Error(
                `failed to parse json patch: ${jsonSource}: ${err}`,
            );
        }
    }
}