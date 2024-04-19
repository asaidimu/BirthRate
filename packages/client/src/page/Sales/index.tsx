import { createResource, createSignal } from "solid-js";
import OrdersHeader from "./Header";
import OrdersTable from "./OrdersTable";
import { useApplicationContext } from "../../app/context";
import { exportDataToFile } from "../../app/lib/FileUtils";

export default () => {
    const { orders } = useApplicationContext();
    const [data] = createResource(
        async (): Promise<Array<Order>> => {
            const result: Array<Order> | undefined = await orders.getOrders()
            return result ? result : [];
        }
    );

    return (
        <div class="w-full h-screen flex flex-col p-4">
            <div class="flex flex-col gap-4 mb-4">
                <OrdersHeader
                    onExport={async (type) => {
                        const data = await orders.getOrders();
                        exportDataToFile({
                            data,
                            type: type as any,
                            name: "Exported Order Data",
                        });
                    }}
                />
            </div>
            <OrdersTable data={data} />
            <div class="join p-4">
                <button class="join-item btn btn-outline">«</button>
                <button class="join-item btn btn-outline">1</button>
                <button class="join-item btn btn-outline">»</button>
            </div>
        </div>
    );
};
