import { IoReload } from "solid-icons/io";
import { createSignal } from "solid-js";

function ReloadButton(props: { onClick: () => void }) {
    const [checked, setChecked] = createSignal(false);

    return (
        <button class="w-12 h-12">
            <label
                class="swap"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    props.onClick();
                    setChecked(true);
                    setTimeout(() => {
                        setChecked(false);
                    }, 300);
                }}
            >
                <input checked={checked()} type="checkbox" />
                <div class="swap-on h-12 flex items-center">
                    <span class="loading loading-spinner loading-md"></span>
                </div>
                <div class="swap-off h-12 flex items-center">
                    <IoReload class="fill-base-content" size="24px" />
                </div>
            </label>
        </button>
    );
}

export default ReloadButton;
