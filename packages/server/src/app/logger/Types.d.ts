type LogLevel = "LOG" | "WARN" | "TRACE" | "DEBUG" | "ERROR";
type LogLevels = Record<Lowercase<LogLevel>, (msg: string | number|object) => void>;