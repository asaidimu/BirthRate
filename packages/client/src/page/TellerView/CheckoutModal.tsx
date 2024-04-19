import { createEffect, on } from "solid-js";
import { createStore } from "solid-js/store";
import { useTellerViewContext } from "./Context";

function CheckOutModal() {
  const { visibleCheckoutModal, getCartValue, hideCheckOutModal } =
    useTellerViewContext();

  const [state, setState] = createStore<{
    cash: number;
    change: number;
    mpesa: number;
  }>({ cash: "" as any, mpesa: "" as any, change: 0 });

  const isValid = () => state.cash + state.mpesa >= getCartValue();

  const resetState = () => {
    setState({ cash: "" as any, mpesa: "" as any, change: 0 });
  };

  createEffect(
    on(
      () => state.cash,
      () => {
        const cash = Number.isNaN(Number(state.cash)) ? 0 : state.cash;
        const difference = cash - getCartValue();
        const change = difference < 0 ? 0 : difference;
        setState("change", change);
      },
      { defer: true }
    )
  );

  return (
    <div class="modal" classList={{ "modal-open": visibleCheckoutModal() }}>
      <div class="modal-box p-0  w-96">
        <div class="rounded-t-md p-4 uppercase text-center border-b-2 border-b-base-300">
          <h3 class="font-bold text-lg">Complete Purchase</h3>
        </div>
        <div class="p-4 flex flex-col gap-4">
          <div class="flex  font-bold">
            {" "}
            <span class="block grow monospace uppercase">TOTAl</span>
            <span class="block text-end">
              {"Kshs "}
              {getCartValue()}
            </span>
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Mpesa Payment</span>
            </label>
            <input
              name="mpesa-amount"
              value={state.mpesa}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                const value = Number(input.value);
                if (Number.isNaN(value)) {
                  return;
                }
                setState("mpesa", value);
              }}
              type="text"
              placeholder="Enter Mpesa Amount"
              class="input input-bordered w-full"
            />
          </div>
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Cash Payment</span>
            </label>
            <input
              name="cash-amount"
              value={state.cash}
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                const value = Number(input.value);
                if (Number.isNaN(value)) {
                  return;
                }
                setState("cash", value);
              }}
              type="text"
              placeholder="Enter Cash Amount"
              class="input input-bordered w-full"
            />
          </div>

          <div class="flex  font-bold">
            {" "}
            <span class="block grow monospace uppercase">CHANGE</span>
            <span class="block text-end">
              {"Kshs "}
              {state.change}
            </span>
          </div>
        </div>
        <div class="modal-action flex p-4 justify-center rounded-b-md">
          <button class="btn w-40 hover:bg-success" disabled={!isValid()}>
            Complete
          </button>
          <button
            class="btn w-40 hover:bg-error"
            onClick={() => {
              hideCheckOutModal();
              resetState();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModal;
