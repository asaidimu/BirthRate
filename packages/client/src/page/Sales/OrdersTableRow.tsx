import { Show } from "solid-js";
import { formatDateToDDMMYYYY } from "../../app/lib/DateUtils";

export function OrdersTableRow(props: {
    order: Order;
    onComplete: () => void;
    onCancel: () => void;
}) {
    return (
        <tr>
            <td class="text-center w-8 font-bold">{`# ${String(
                props.order.id
            ).padStart(3, "0")}`}</td>
            <td class="text-center w-8">
                {formatDateToDDMMYYYY(new Date(props.order.time))}
            </td>
            <td class="text-center w-4">{props.order.total}</td>
            <td class="">{props.order.user}</td>
            <td></td>
            <td class="w-12 text-center">
                <Show when={props.order.status.localeCompare("pending") === 0}>
                    <div class="flex gap-4">
                        <button class="btn btn-outline border-0 btn-success" onClick={() => props.onComplete()}>
                            Complete
                        </button>
                        <button class="btn btn-outline border-0 btn-error" onClick={()=> props.onCancel()}>Cancel</button>
                    </div>
                </Show>
            </td>
        </tr>
    );
}
