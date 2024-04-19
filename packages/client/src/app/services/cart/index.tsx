export default function createCartService({ api }: { api: RequestHelper }) {
  async function addItemToCart(item: Pick<CartItem, "id" | "quantity">) {
    return await api.post<boolean>("/cart", { item });
  }

  async function removeItemFromCart(item: Pick<InventoryItem, "id">) {
    return await api.delete<boolean>("/cart", { item });
  }

  async function submitCart() {
    return await api.get<boolean>("/cart/submit");
  }

  async function clearCart() {
    return await api.get<boolean>("/cart/clear");
  }

  async function updateItemQuantity(item: Pick<CartItem, "id" | "quantity">) {
    return await api.put<boolean>("/cart", { item });
  }

  async function getCartItems() {
    const result = await api.get<{ items: Array<CartItem> }>("/cart");
    if (result && typeof result !== "boolean") {
      return result.items;
    }
    return null;
  }

  async function getCartValue() {
      const items = await getCartItems()
      if(items !== null) {
        return items.reduce((a, i) => a + i.price * i.quantity, 0);
      }
      return 0
  }

  return {
    clearCart,
    getCartValue,
    getCartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    submitCart,
  };
}

export type CartService = ReturnType<typeof createCartService>;
