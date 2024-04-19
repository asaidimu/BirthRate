import {
    createContext,
    createSignal,
    createUniqueId,
    useContext,
} from "solid-js";
import NotificationView from "./View";

const NotificationContext = createContext<NotificationContext>();

export function useNotificationContext(): NotificationContext {
    return useContext(NotificationContext) as any;
}

type NotificationContextProviderProps = {
    children: any;
};

export function NotificationContextProvider(
    props: NotificationContextProviderProps
) {
    type UiNotificationData = { [key: string]: UiNotification };

    const [notifications, setNotifications] = createSignal(
        {} as UiNotificationData
    );

    function reduceUiDataToArray(data: UiNotificationData) {
        const result: Array<UiNotification> = Object.values(data);
        return result;
    }

    function updateNotifications(notification: UiNotification) {
        const id = createUniqueId();

        setNotifications((all) => {
            const data = structuredClone(all);
            data[id] = notification;
            return data;
        });

        setTimeout(() => {
            setNotifications((all) => {
                const data = structuredClone(all);
                delete data[id];
                return data;
            });
        }, 3000);
    }

    const context = {
        info: (message: string) => updateNotifications({ level: "info", message }),
        warn: (message: string) => updateNotifications({ level: "warning", message }),
        success: (message: string) =>
            updateNotifications({ level: "success", message }),
        error: (message: string) =>
            updateNotifications({ level: "error", message }),
    };
    return (
        <NotificationContext.Provider value={context}>
            {props.children}
            <NotificationView notifications={reduceUiDataToArray(notifications())} />
        </NotificationContext.Provider>
    );
}
