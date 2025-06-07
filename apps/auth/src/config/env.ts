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
    KEYCLOAK_REALM: string | undefined;
    KEYCLOAK_URL: string | undefined;
    KEYCLOAK_CLIENT_ID: string | undefined;
    KEYCLOAK_SECRET: string | undefined;
}

interface Config {
    NODE_ENV: string;
    APP_PORT: number;
    APP_NAME: string;
    APP_HOST: string;
    KEYCLOAK_REALM: string;
    KEYCLOAK_URL: string;
    KEYCLOAK_CLIENT_ID: string;
    KEYCLOAK_SECRET: string;
}

export const getEnv = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        APP_PORT: process.env.APP_PORT
            ? parseInt(process.env.APP_PORT)
            : undefined,
        APP_NAME: process.env.APP_NAME,
        APP_HOST: process.env.APP_HOST,
        KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
        KEYCLOAK_URL: process.env.KEYCLOAK_URL,
        KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
        KEYCLOAK_SECRET: process.env.KEYCLOAK_SECRET
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
