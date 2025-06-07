import {
    DATE_FORMAT,
    LOG_COLOUR,
    LOG_LEVEL,
    TIME_FORMAT
} from "@repo/e-constants";
import * as winston from "winston";
import { Transport } from "./transport";
import { createTransports } from "./transport-creator";

const level = process.env.NODE_ENV !== "production" ? "debug" : "info";

const colours = {
    error: LOG_COLOUR.red,
    warn: LOG_COLOUR.yellow,
    info: LOG_COLOUR.blue,
    http: LOG_COLOUR.magenta,
    debug: LOG_COLOUR.white,
};

winston.addColors(colours);

const levels = {
    error: LOG_LEVEL.zero,
    warn: LOG_LEVEL.one,
    info: LOG_LEVEL.two,
    http: LOG_LEVEL.three,
    debug: LOG_LEVEL.four,
};

const format = winston.format.combine(
    winston.format.timestamp({ format: `${DATE_FORMAT} ${TIME_FORMAT}` }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
);

export const createLogger = (config: Transport[]): winston.Logger => {
    return winston.createLogger({
        transports: createTransports(config),
        levels,
        level,
        format,
    });
};