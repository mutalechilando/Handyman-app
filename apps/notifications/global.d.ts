declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production";
            DB_HOST: string;
            DB_PORT: number;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            PORT: number;
            RABBIT_MQ_URI: string;
            NOTIFICATION_QUEUE: string;
        }
    }
}
