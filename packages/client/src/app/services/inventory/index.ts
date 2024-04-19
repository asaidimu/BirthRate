export default function createInventoryService({
  api,
}: {
  api: RequestHelper;
}) {
  async function getInventoryItems() {
    type ServerResponse = { items: Array<InventoryItem> };
    const results = await api.get<ServerResponse>("/menu/all");
    if (results && (results as ServerResponse).items) {
      const { items } = results as ServerResponse;
      return items;
    }
  }

    async function update(values:InventoryItem){
        return await api.put<boolean>("/menu", values)
    }

    async function create(values:Array<Omit<InventoryItem, "id">>){
        const data = Array.isArray(values) ? values : [values]
        /* TODO: FIX IMAGE UPLOAD */
        const items = data.map(i => {
            i.image = "https://loremflickr.com/640/480/food"
            return i
        })
        return await api.post<boolean>("/menu", { items })
    }

    async function remove(values:{ id: number | Array<number>}){
        return await api.delete<boolean>("/menu", values)
    }

  return {
    getInventoryItems,
        update,
        create,
        remove
  };
}

export type InventoryService = ReturnType<typeof createInventoryService>;
