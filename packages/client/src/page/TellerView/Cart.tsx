import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  on,
  onMount,
} from "solid-js";
import { useApplicationContext } from "../../app/context";
import CartListItem from "./CartListItem";
import Loader from "../../components/Loader";
import { useNotificationContext } from "../../components/Notification/Context";
import { useTellerViewContext } from "./Context";
import ReloadButton from "../../components/ReloadButton";

export default function UserCart() {
  const { cartData, getCartValue, showCheckOutModal, refetchCartData } =
    useTellerViewContext();
  const { cart } = useApplicationContext();
  const notify = useNotificationContext();
  const [loaded, setLoaded] = createSignal(false);

  const getItems = createMemo(() => {
    const result = cartData();
    return result === null ? [] : result;
  });

  onMount(() => {
    refetchCartData();
  });

  createEffect(
    on(
      () => cartData.loading,
      () => {
        setLoaded(true);
      }
    )
  );

  return (
    <div
      style="height:calc(100vh - 5rem);"
      class="w-[42rem] border-l border-base-300 bg-base-100 text-base-content flex flex-col overflow-hidden"
    >
      <div class="flex h-12 items-center p-4 border-b border-base-300">
        <h3 class="text-xl grow">Current Cart</h3>
        <span class="flex-1" />
        <ReloadButton onClick={refetchCartData} />
      </div>
      <ul class="menu block rounded flex-grow overflow-y-scroll overflow-x-hidden no-scrollbar p-0 border-b border-base-300">
        <Show when={loaded()} fallback={<Loader />}>
          <For each={getItems()}>
            {(item) => <CartListItem item={item} refetch={refetchCartData} />}
          </For>
        </Show>
      </ul>
      <div class="flex flex-col min-h-[8rem] gap-2 p-4 border-b border-base-300">
        <div class="flex  font-bold">
          {" "}
          <span class="block grow monospace uppercase">TOTAl</span>
          <span class="block text-end">
            {"Kshs "}
            {getCartValue()}
          </span>
        </div>
      </div>
      <div class="w-full flex text-center flex gap-4 h-20 p-4">
        <button
          class="btn w-32 btn-success"
          disabled={getCartValue() === 0}
          onClick={async () => {
            // await cart.submitCart();
            showCheckOutModal();
            refetchCartData();
          }}
        >
          CHECKOUT
        </button>
        <button
          class="btn w-32 btn-error"
          disabled={getCartValue() === 0}
          onClick={async () => {
            await cart.clearCart();
            refetchCartData();
            notify.warn("Cart Cleared");
          }}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}
