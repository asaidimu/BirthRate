import { Writable } from "stream";
import { enableDebug, parsedDateTime, repeatChar } from "./utils.js";

type L = (...args: any) => any;

interface TryLog {
    <A extends L, F>(
        action: A,
        fallback: F,
        level?: Lowercase<LogLevel>
    ): Promise<ReturnType<A> | F>;
}

export default function createSystemLogger(streams: Array<Writable>) {
    const log = (level: LogLevel, msg: string | number | object) => {
        let message = msg;
        if (typeof message === "object") {
            message = `\n${JSON.stringify(msg, null, 4)}`;
        }
        const size = 6 - level.length;
        const { date, time } = parsedDateTime();
        streams.forEach((s) =>
            s.write(
                `[${date}:${time}]${repeatChar(
                    " ",
                    size
                )}${level} │ ${message}\n`
            )
        );
    };

    const levels: LogLevels = {
        log: (msg: string | number | object) => log("LOG", msg),
        warn: (msg: string | number | object) => log("WARN", msg),
        trace: (msg: string | number | object) => log("TRACE", msg),
        debug: (msg: string | number | object) =>
            enableDebug() && log("DEBUG", msg),
        error: (msg: string | number | object) => log("ERROR", msg),
    };

    const handleErrors: TryLog = async (action, fallback, level = "warn") => {
        try {
            const results = await action();
            return results;
        } catch (e) {
            const logfn = levels[level] as (msg: string | number) => void;
            if (e instanceof Error && e.stack !== undefined) {
                logfn(e.stack);
            } else {
                logfn(String(e));
            }
            return fallback;
        }
    };

    return Object.assign(levels, { handleErrors });
}

declare global {
    type SystemLogger = ReturnType<typeof createSystemLogger>;
}
