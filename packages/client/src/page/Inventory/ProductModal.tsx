import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { Show, createEffect, on } from "solid-js";
import { InventoryItemData } from "./validator";
import { hasError, getError } from "../../app/lib/ValidatorUtils"
import { useApplicationContext } from "../../app/context";

export default function ProductModal(props: { ref: HTMLDialogElement, data?: InventoryItem, refetch: () => void, onReset: () => void }) {
    const { inventory } = useApplicationContext();
    const { form, reset, errors, setData } = createForm({
        extend: validator({ schema: InventoryItemData }),
        onSubmit: async (values) => {
            const item = structuredClone(values)
            const update = structuredClone(props.data !== undefined)
            props.onReset()
            if (update) {
                await inventory.update(item)
            } else {
                delete item.id
                await inventory.create([item])
            }
            props.refetch()
            reset()
        }
    })

    createEffect(on(() => props.data, () => {
        if (props.data) {
            setData(props.data as any)
        }
    }))

    const getValue = <K extends keyof InventoryItem>(key: K): InventoryItem[K] | "" => {
        if (props.data && props.data[key]) {
            return props.data[key]
        }
        return ""
    }

    return (
        <dialog ref={props.ref} class="modal">
            { /* @ts-ignore */}
            <form method="dialog" class="modal-box max-w-3xl" use: form>
                <input name="id" class="hidden" value={getValue("name")} />
                <div class="flex flex-col gap-4">
                    <h3 class="font-bold text-lg">{
                            props.data ? "Edit Item" : "Create Item"

                    }
                    </h3>
                    <div class="grid grid-cols-2 flex-wrap gap-4">

                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                value={getValue("name")}
                                placeholder="Name"
                                class="input input-bordered w-full"
                            />
                            <label class="label">
                                <Show when={hasError(errors, "name")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError(errors, "name")}
                                    </span>
                                </Show>
                            </label>
                        </div>

                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Quantity</span>
                            </label>
                            <input
                                name="available"
                                type="number"
                                value={getValue("available")}
                                placeholder="Available Quantity"
                                class="input input-bordered w-full"
                            />
                            <label class="label">
                                <Show when={hasError(errors, "available")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError(errors, "available")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Price</span>
                            </label>
                            <input
                                name="price"
                                type="number"
                                value={getValue("price")}
                                placeholder="Price"
                                class="input input-bordered w-full"
                            />
                            <label class="label">
                                <Show when={hasError(errors, "price")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError(errors, "price")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                        <div class="form-control w-full">
                            <label class="label">
                                <span class="label-text">Select item image</span>
                            </label>
                            <input
                                name="image"
                                type="file"
                                class="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div class="form-control w-full col-span-2">
                            <textarea
                                name="description"
                                value={getValue("description")}
                                class="textarea textarea-bordered"
                                placeholder="Description"
                            ></textarea>
                            <label class="label">
                                <Show when={hasError(errors, "description")}>
                                    <span class="label-text-alt text-error font-bold">
                                        {getError(errors, "description")}
                                    </span>
                                </Show>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="modal-action">
                    <button class="btn btn-error" type="reset" onClick={() => {
                        reset()
                        props.onReset()
                    }}>CANCEL</button>
                    <button class="btn btn-success" type="submit">
                        {
                            props.data ? "UPDATE" : "CREATE"
                        }
                    </button>
                </div>
            </form>
        </dialog>
    );
}
