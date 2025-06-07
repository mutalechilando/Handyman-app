import { LoggerFactory } from "@repo/logger";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
    dotenv.config({ path: ".env.development" });
}

const logger = LoggerFactory.getLogger();

interface ENV {
    NODE_ENV: string | undefined;
    APP_PORT: number | undefined;
    APP_NAME: string | undefined;
    APP_HOST: string | undefined;
    DB_USER: string | undefined;
    DB_HOST: string | undefined;
    DB_NAME: string | undefined;
    DB_PASSWORD: string | undefined;
    DB_PORT: number | undefined;
    TCP_PORT: number | undefined;
}

interface Config {
    NODE_ENV: string;
    APP_PORT: number;
    APP_NAME: string;
    APP_HOST: string;
    DB_USER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    TCP_PORT: number;
}

export const getEnv = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        APP_PORT: process.env.APP_PORT
            ? parseInt(process.env.APP_PORT)
            : undefined,
        APP_NAME: process.env.APP_NAME,
        APP_HOST: process.env.APP_HOST,
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_PORT: process.env.DB_PORT
            ? parseInt(process.env.DB_PORT)
            : undefined
        ,
        TCP_PORT: process.env.TCP_PORT
            ? parseInt(process.env.TCP_PORT)
            : undefined
    };
};

const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            logger.error(`missing key ${key} in environment variables.`);
        }
    }
    return config as Config;
};

export const config = getSanitizedConfig(getEnv());
