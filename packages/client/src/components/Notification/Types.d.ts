interface NotificationContext {
    info: ( message: string ) => void,
    warn: ( message: string ) => void,
    success: ( message: string ) => void,
    error: ( message: string ) => void,
}

type NotificationLevel = "warning" | "info" | "success" | "error";

interface UiNotification {
    message: string;
    level: NotificationLevel;
}

