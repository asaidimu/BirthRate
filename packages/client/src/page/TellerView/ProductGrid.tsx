import { For } from "solid-js";
import ProductGridItem from "./ProductGridItem";
import { useTellerViewContext } from "./Context";

export default () => {
  const {
    inventoryData,
    setCurrentCategory,
    getProductCategories,
    isActiveCategory,
  } = useTellerViewContext();
  return (
    <div
      style="height:calc(100vh - 5rem);"
      class="overflow-y-auto flex-grow no-scrollbar"
    >
      <div class="tabs h-12 w-full py-4 product-categories sticky top-0 z-20 bg-base-100">
        <span class="tab tab-lifted cursor-default" />
        <For each={getProductCategories()}>
          {(item) => (
            <a
              onClick={() => setCurrentCategory(item.id)}
              class="tab tab-lifted"
              classList={{ "tab-active": isActiveCategory(item.id) }}
            >
              {item.name}
            </a>
          )}
        </For>
        <span class="tab tab-lifted cursor-default flex-1" />
      </div>{" "}
      <ul class="p-4 grid 2xl:grid-cols-4 grid-cols-3 gap-4 2xl:gap-8 place-content-center z-10">
        <For each={inventoryData()}>
          {(item) => <ProductGridItem item={item} />}
        </For>
      </ul>
    </div>
  );
};
