import { FaSolidCartPlus } from "solid-icons/fa";
import { useApplicationContext } from "../../app/context";
import { useTellerViewContext } from "./Context";

export default (props: { item: InventoryItem }) => {
    const {refetchCartData } = useTellerViewContext()
    const { cart} = useApplicationContext();
    return (
        <li class="flex justify-center items-center">
            <div class="card hover:shadow-md w-80 h-[28rem] bg-base-100 rounded-md border border-base-300">
                <figure class="shrink-0 grow-0">
                    <img
                        class="w-full xl:h-48"
                        src={props.item.image}
                        alt={props.item.name}
                    />
                </figure>
                <div class="card-body p-2">
                    <h2 class="card-title">{props.item.name}</h2>
                    <p class="h-8">{props.item.description}</p>
                    <div class="card-actions justify-end grow-0 h-12 flex items-center">
                        <p class="font-bold text-sm">
                            Kshs
                            {" "}
                            <span class="text-2xl">
                                {props.item.price}
                            </span>
                            {" /="}
                        </p>
                        <button class="h-12 w-12 btn btn-ghost"
                            onClick={async () => {
                                await cart.addItemToCart({ id: props.item.id, quantity: 1 })
                                refetchCartData()
                            }}
                        ><FaSolidCartPlus class="fill-base-content" size="24px" /> </button>
                    </div>
                </div>
            </div>
        </li >
    );
};
