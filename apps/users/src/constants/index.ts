import { config } from "@users/config/env";

export const version = {
    VERSION: "1",
    VERSIONING_PREFIX: "v",
    GLOBAL_PREFIX: "/api",
};

export const swaggerDocs = {
    NAME: `${config.APP_NAME} API Specification`,
    VERSION: "1.0.0",
    DESCRIPTION: `Documentation for the ${config.APP_NAME} API`,
    PREFIX: "/docs",
};
