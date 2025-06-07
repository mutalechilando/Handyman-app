declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            KEYCLOAK_REALM: string;
            KEYCLOAK_URL: string;
            KEYCLOAK_CLIENT_ID: string;
            KEYCLOAK_SECRET: string;
            PORT: number;
        }
    }
}
