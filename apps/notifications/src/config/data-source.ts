import { DataSource } from "typeorm";
import { config } from "./env";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    logging: config.NODE_ENV === "development",
    entities: [__dirname + "/../**/*.entity{.ts,.js}"],
    synchronize: false,
});
