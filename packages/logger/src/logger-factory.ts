import * as winston from "winston";
import { createLogger } from "./logger";
import { transportsConfig } from "./transport-config";

export class LoggerFactory {
    private static logger: winston.Logger;

    static getLogger(): winston.Logger {
        if (!LoggerFactory.logger) {
            LoggerFactory.logger = createLogger(transportsConfig);
        }

        return LoggerFactory.logger;
    }
}