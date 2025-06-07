import DailyRotateFile, {
    type DailyRotateFileTransportOptions,
} from "winston-daily-rotate-file";
import {
    Console,
    type ConsoleTransportInstance,
    type ConsoleTransportOptions,
} from "winston/lib/winston/transports";
import { type Transport } from "../transport";
import { TransportType } from "../transport-type";

const createConsoleTransport = (
    options: ConsoleTransportOptions,
): ConsoleTransportInstance => {
    return new Console(options);
};

const createFileTransport = (
    options: DailyRotateFileTransportOptions,
): DailyRotateFile => {
    return new DailyRotateFile(options);
};

export const createTransports = (
    config: Transport[],
): (ConsoleTransportInstance | DailyRotateFile)[] => {
    return config.map(({ type, options }) => {
        switch (type) {
            case TransportType.CONSOLE:
                return createConsoleTransport(options);
            case TransportType.FILE:
                return createFileTransport(options);
        }
    });
};