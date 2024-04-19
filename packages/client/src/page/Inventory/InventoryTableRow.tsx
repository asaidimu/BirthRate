import { BiSolidEditAlt } from "solid-icons/bi";

export function InventoryTableRow(props: {
    item: InventoryItem;
    onEdit: () => void;
    onRemove: () => void;
}) {
    return (
        <tr>
            <td class="w-64">
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={props.item.image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{props.item.name}</div>
                    </div>
                </div>
            </td>
            <td class="w-80">{props.item.description}</td>
            <td class="w-24 text-center">{props.item.price}</td>
            <td class="w-24 text-center">{props.item.available}</td>
            <td class="w-12 text-center">
                <button onClick={() => props.onEdit()}>
                    <BiSolidEditAlt class="fill-base-content" size="24px" />
                </button>
            </td>
        </tr>
    );
}
