import InventoryTable from "./InventoryTable";
import InventoryHeader from "./Header";
import ProductModal from "./ProductModal";
import { createSignal } from "solid-js";
import { useApplicationContext } from "../../app/context";
import { createResource } from "solid-js";
import { exportDataToFile } from "../../app/lib/FileUtils";

export default () => {
    let modal!: HTMLDialogElement;
    const { inventory } = useApplicationContext();
    const [data, setData] = createSignal<undefined | InventoryItem>(undefined);

    const [inventoryData, { refetch }] = createResource(
        async () => await inventory.getInventoryItems()
    );

    const showModal = () => modal.showModal();
    const resetModal = () => {
        setData(undefined);
        modal.close();
    };

    return (
        <div class="w-full h-screen flex flex-col p-4 gap-4 overflow-hidden">
            <InventoryHeader
                modal={{ showModal }}
                onExport={(type: string) => {
                    exportDataToFile({
                        data: inventoryData(),
                        type: type as any,
                        name: "Exported Inventory Data",
                    });
                }}
            />
            <div class="card bg-base-200 rounded-md overflow-y-auto flex-grow items-center">
                <InventoryTable
                    refetch={refetch}
                    data={inventoryData}
                    onEditItem={async (i: InventoryItem) => {
                        setData(i);
                        showModal();
                    }}
                />
                <div class="join p-4">
                    <button class="join-item btn btn-outline">«</button>
                    <button class="join-item btn btn-outline">1</button>
                    <button class="join-item btn btn-outline">»</button>
                </div>
            </div>
            <ProductModal
                ref={modal}
                data={data()}
                onReset={resetModal}
                refetch={refetch}
            />
        </div>
    );
};
