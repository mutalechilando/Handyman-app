import { type DailyRotateFileTransportOptions } from "winston-daily-rotate-file";
import { type ConsoleTransportOptions } from "winston/lib/winston/transports";
import { type TransportType } from "../transport-type";

interface ConsoleTransport {
    type: TransportType.CONSOLE;
    options: ConsoleTransportOptions;
}

interface FileTransport {
    type: TransportType.FILE;
    options: DailyRotateFileTransportOptions;
}

export type Transport = ConsoleTransport | FileTransport;