import { BsThreeDotsVertical } from "solid-icons/bs";

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
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-base-100 btn-circle avatar">
            <BsThreeDotsVertical class="fill-base-content" />
          </label>
          <ul
            tabindex="0"
            class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => props.onEdit()}>Edit</a>
            </li>
            <li>
              <a onClick={() => props.onRemove()}>Remove</a>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
