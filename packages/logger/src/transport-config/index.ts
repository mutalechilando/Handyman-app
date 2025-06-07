import { DATE_FORMAT } from "@repo/e-constants";
import { type Transport } from "../transport";
import { TransportType } from "../transport-type";

export const transportsConfig: Transport[] = [
    {
        type: TransportType.CONSOLE,
        options: {},
    },
    {
        type: TransportType.FILE,
        options: {
            filename: "info-%DATE%.log",
            dirname: "./.logs",
            level: "info",
            datePattern: DATE_FORMAT,
        },
    },
    {
        type: TransportType.FILE,
        options: {
            filename: "error-%DATE%.log",
            dirname: "./.logs",
            level: "error",
            datePattern: DATE_FORMAT,
        },
    },
];