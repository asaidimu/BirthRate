import { For, Show, createSignal, Resource } from "solid-js";
import Loader from "../../components/Loader";
import { useApplicationContext } from "../../app/context";
import { InventoryTableRow } from "./InventoryTableRow";
import { useNotificationContext } from "../../components/Notification/Context";


interface TableProps {
  onEditItem: { (i: InventoryItem): void };
  data: Resource<Array<InventoryItem> | undefined>
  refetch: () => void
}
export default function (props: TableProps) {
  const { inventory } = useApplicationContext();
  const [removedItem, setRemovedItem] = createSignal<InventoryItem | null>(
    null
  );
  let confirmDelete!: HTMLDialogElement;
  const notify = useNotificationContext()
  return (
    <div class="flex-grow w-full">
      <table class="table">
        <thead>
          <tr>
            <th class="uppercase font-bold w-64">Name</th>
            <th class="uppercase font-bold w-80">Description</th>
            <th class="uppercase font-bold w-24 text-center">Price</th>
            <th class="uppercase font-bold w-24 text-center">Available</th>
            <th class="uppercase font-bold w-24 text-center"></th>
          </tr>
        </thead>
        <tbody>
          <Show when={!props.data.loading} fallback={<Loader />}>
            <For each={props.data()}>
              {(item) => (
                <InventoryTableRow
                  item={item}
                  onEdit={() => props.onEditItem(item)}
                  onRemove={() => {
                    setRemovedItem(item);
                    confirmDelete.showModal();
                  }}
                />
              )}
            </For>
          </Show>
        </tbody>
      </table>
      <dialog ref={confirmDelete} class="modal">
        <div class="modal-box">
            <h3 class="font-bold text-lg">Remove Item</h3>
          <p class="py-4">
            {`
            Perfoming this action will mark the item as removed from inventory.
            Customers will not be able to view it on the website.
            `}{" "}
          </p>
          <p class="py-4">
            {`
            Please note:
                - Pending orders that contain the item will not be affected.
                    `}
          </p>
          <p class="py-4">
            To proceed click on{" "}
            <span class="font-bold uppercase text-error">DELETE</span>{" "}
          </p>
          <div class="modal-action">
            <button
              class="btn btn-success"
              type="reset"
              onClick={() => {
                confirmDelete.close();
                notify.info("operation cancelled")
                setRemovedItem(null);
              }}
            >
              CANCEL
            </button>
            <button
              class="btn btn-error"
              onClick={async () => {
                confirmDelete.close();
                await inventory.remove({ id: removedItem()!.id });
                props.refetch()
              }}
            >
              DELETE
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
