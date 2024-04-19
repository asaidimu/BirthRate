export default function InventoryHeader(props:{ modal: { showModal: () => void },  onExport: (props:string) => void}) {
    let ref!: HTMLSelectElement
    return (
        <div class="navbar bg-base-200 rounded-md gap-4">
            <div class="flex-none">
                <button class="btn btn-neutral"
                onClick={() =>props.modal.showModal()}
                >New Product</button>
            </div>
            <span class="flex-grow" />
            <div class="join">
                <div class="indicator">
                    <button class="btn btn-neutral join-item" onClick={() => {
                        props.onExport(ref.value)
                        }}>Export</button>
                </div>
                <select class="select select-bordered join-item" ref={ref}>
                    <option selected value="json">JSON</option>
                    <option value="excel">EXCEL</option>
                    <option value="csv">CSV</option>
                </select>
            </div>
        </div>
    );
}
