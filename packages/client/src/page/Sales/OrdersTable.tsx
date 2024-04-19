import { For, ResourceReturn, Show, createSignal } from "solid-js";
import { OrdersTableRow } from "./OrdersTableRow";
import { useApplicationContext } from "../../app/context";


export default function OrdersTable(props: {
    data: ResourceReturn<Array<Order>>[0];
}) {
    const { orders} = useApplicationContext()
    enum State {
        COMPLETE = 1,
        CANCEL = 2,
    }

    const [status, setStatus] = createSignal(State.COMPLETE);
    const [orderId, setOrderId] = createSignal(-1)
    let modal!:HTMLDialogElement

    return (
        <div class="flex-grow w-full h-screen overflow-y-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th class="uppercase font-bold w-8">Order ID</th>
                        <th class="uppercase font-bold w-8">Date </th>
                        <th class="uppercase font-bold w-4 text-center">Total Value</th>
                        <th class="uppercase font-bold">Customer</th>
                        <th class="uppercase font-bold w-12 text-center"></th>
                    </tr>
                </thead>
                <tbody>
                    <Show when={!props.data.loading}>
                        <For each={props.data()}>
                            {(i) => {
                                return (
                                    <OrdersTableRow
                                        order={i}
                                        onCancel={() => {
                                            setOrderId(i.id)
                                            setStatus(State.CANCEL)
                                            modal.showModal()
                                        }}
                                        onComplete={() => {
                                            setOrderId(i.id)
                                            setStatus(State.COMPLETE)
                                            modal.showModal()
                                        }}
                                    />
                                );
                            }}
                        </For>
                    </Show>
                </tbody>
            </table>
            <dialog  ref={modal} class="modal">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">{`${status() === State.COMPLETE ? "Complete" : "Cancel" } Order`}</h3>
                    <p class="py-4">Do you wish to proceed with this action?</p>
                    <div class="modal-action">
                        <button class="btn btn-error w-24" onClick={() => modal.close()}>CANCEL</button>
                        <button class="btn btn-success w-24" onClick={async () => {
                            modal.close()
                            if(orderId() === -1) {
                                return
                            }
                            let result = false
                            if(status() === State.COMPLETE) {
                                result = await orders.completeOrder({id: orderId()})
                            } else {
                                result = await orders.cancelOrder({id: orderId()})
                            }
                            console.log({ result })
                        }

                        }>OK</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
}
