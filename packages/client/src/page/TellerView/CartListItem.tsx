import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "solid-icons/ai";
import { useApplicationContext } from "../../app/context";
import { useNotificationContext } from "../../components/Notification/Context";

export default function CartListItem(props: {
  item: CartItem;
  refetch: () => void;
}) {
  const { cart } = useApplicationContext();
  const notify = useNotificationContext();
  return (
    <li class="flex flex-row hover:bg-base-content/10 rounded">
      <div class="avatar hover:bg-transparent">
        <div class="mask mask-squircle w-12 h-12">
          <img src={props.item.image} alt="Avatar Tailwind CSS Component" />
        </div>
      </div>
      <div class="flex flex-col hover:bg-transparent grow">
        <span class="w-full block font-bold">{props.item.name}</span>
        <div class="w-full block monospace space-y-4">
          <span>
            <span class="font-bold">Unit</span> : {props.item.price}{" "}
          </span>
          <span>
            Total :
            <span class="font-bold">
              {" "}
              {props.item.price * props.item.quantity}
            </span>
          </span>
        </div>
      </div>
      <div
        class="hover:bg-transparent active:bg-transparent"
        style="background-color: transparent !important;"
      >
        <button
          class="btn btn-ghost h-6 w-6 hover:bg-warning"
          onClick={async () => {
            const { id, quantity } = props.item;
            await cart.updateItemQuantity({ id, quantity: quantity - 1 });
            props.refetch();
          }}
        >
          <AiOutlineMinus class="fill-base-content" size="12px" />
        </button>
        <input
          value={props.item.quantity}
          type="text"
          name="item-quantity"
          onChange={async (e) => {
            const target = e.target as HTMLInputElement;
            const quantity = Number(target.value);
            console.log({ quantity });
            if (Number.isNaN(quantity)) {
              notify.error("Item quantity must be a number!");
              target.value = String(props.item.quantity);
              return;
            }
            await cart.updateItemQuantity({ id: props.item.id, quantity });
            props.refetch();
          }}
          class="input input-ghost w-14 text-center"
        />
        <button
          class="btn btn-ghost h-6 w-6 hover:bg-success"
          onClick={async () => {
            const { id, quantity } = props.item;
            await cart.updateItemQuantity({ id, quantity: quantity + 1 });
            props.refetch();
          }}
        >
          <AiOutlinePlus class="fill-base-content" size="12px" />
        </button>
        <button
          class="btn btn-ghost h-6 w-6 hover:bg-error"
          onClick={async () => {
            const { id } = props.item;
            await cart.removeItemFromCart({ id });
            props.refetch();
          }}
        >
          <AiOutlineDelete class="fill-base-content" size="12px" />
        </button>
      </div>
    </li>
  );
}
