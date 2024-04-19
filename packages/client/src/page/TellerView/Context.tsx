import {
  ResourceReturn,
  createContext,
  createMemo,
  createResource,
  createSignal,
  useContext,
} from "solid-js";
import { useApplicationContext } from "../../app/context";

const TellerViewContext = createContext<TellerViewContext>();

export function useTellerViewContext(): TellerViewContext {
  return useContext(TellerViewContext) as any;
}

type TellerViewContextProviderProps = {
  children: any;
};

type ProductCategory = {
  name: string;
  id: number;
};

type TellerViewContext = {
  setCurrentCategory: (_: number) => void;
  isActiveCategory: (_: number) => boolean;
  getProductCategories: () => Array<ProductCategory>;
  cartData: ResourceReturn<Array<CartItem> | null>[0];
  refetchCartData: ResourceReturn<Array<CartItem> | null>[1]["refetch"];
  inventoryData: ResourceReturn<Array<InventoryItem> | undefined>[0];
  refetchInventoryData: ResourceReturn<
    Array<InventoryItem> | undefined
  >[1]["refetch"];

    visibleCheckoutModal: () => boolean,
    showCheckOutModal: () => void
    hideCheckOutModal: () => void,
    getCartValue: () => number
};

export function TellerViewContextProvider(
  props: TellerViewContextProviderProps
) {
  const { cart, inventory } = useApplicationContext();
  const [activeCategory, setActiveCategory] = createSignal(1);
  const [showCheckOutModal, setShowCheckOutModal] = createSignal(false)
  const [cartData, { refetch: refetchCartData }] = createResource(
    async () => await cart.getCartItems()
  );

  const [inventoryData, { refetch: refetchInventoryData }] = createResource(
    async () => await inventory.getInventoryItems()
  );

  const getProductCategories = (): Array<ProductCategory> => [
    { name: "Products", id: 1 },
    { name: "Services", id: 2 },
  ];
  const setCurrentCategory = (_: number) => {
    setActiveCategory(_);
  };

  const isActiveCategory = (i: number) => {
    return i === activeCategory();
  };

  const context = {
    getCartValue: createMemo(() =>{
        const items = cartData()
        if(items) {
            return items.reduce((a, i) => a + i.price * i.quantity, 0);
        }
        return 0
    } ),
    isActiveCategory,
    visibleCheckoutModal: () => showCheckOutModal(),
    showCheckOutModal: () => setShowCheckOutModal(true),
    hideCheckOutModal: () => setShowCheckOutModal(false),
    setCurrentCategory,
    getProductCategories,
    inventoryData,
    cartData,
    refetchCartData,
    refetchInventoryData,
  };

  return (
    <TellerViewContext.Provider value={context}>
      {props.children}
    </TellerViewContext.Provider>
  );
}
