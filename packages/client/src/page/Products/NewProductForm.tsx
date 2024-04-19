
function ProductForm() {


    return (
        <form method="dialog" class="modal-box max-w-xl" use: form>
            <button onClick={() => { reset(); props.onReset() }} class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <input name="id" class="hidden" value={getValue("name")} />
            <div class="flex flex-col gap-2">
                <h3 class="font-bold text-lg">{
                    props.data ? "Edit Item" : "Add New Product"
                }
                </h3>
                <div class="grid grid-cols-2 flex-wrap gap-2">
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
                            <span class="label-text">Category</span>
                        </label>
                        <select class="select select-bordered w-full max-w-xs">
                            <option disabled selected>Select Product Category</option>
                            <option></option>
                            <option></option>
                        </select>
                        <label class="label">
                            <Show when={hasError(errors, "name")}>
                                <span class="label-text-alt text-error font-bold">
                                    {getError(errors, "name")}
                                </span>
                            </Show>
                        </label>
                    </div>

                    <div class="form-control w-full col-span-2">
                        <label class="label">
                            <span class="label-text">Description</span>
                        </label>
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
                    <div class="form-control w-full">
                        <label class="label">
                            <span class="label-text">Cost Price</span>
                        </label>
                        <input
                            name="available"
                            type="number"
                            value={getValue("available")}
                            placeholder="Price"
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
                            <span class="label-text">List Price</span>
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
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">Tangible</span>
                            <input type="radio" name="radio-10" class="radio checked:bg-blue-500" checked />
                        </label>
                    </div>
                    <div class="form-control">
                        <label class="label cursor-pointer">
                            <span class="label-text">Intangible</span>
                            <input type="radio" name="radio-10" class="radio checked:bg-blue-500" checked />
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
                            <span class="label-text">Select item image</span>
                        </label>
                        <input
                            name="image"
                            type="file"
                            class="file-input file-input-bordered w-full max-w-xs"
                        />
                    </div>
                </div>
            </div>
            <div class="modal-action">
                <button class="btn btn-error w-24" type="reset" onClick={() => {
                    reset()
                }}>CLEAR</button>
                <button class="btn btn-info w-24" type="reset" onClick={() => {
                }}>NEXT</button>
                <button class="btn btn-success w-24" type="submit">COMPLETE</button>
            </div>
        </form>


    )
}

export default ProductForm
