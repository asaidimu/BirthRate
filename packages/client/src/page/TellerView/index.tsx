import ProductGrid from "./ProductGrid";
import UserNavigationBar from "./NavigationBar";
import UserCart from "./Cart";
import { TellerViewContextProvider } from "./Context";
import CheckOutModal from "./CheckoutModal";

export default function () {
  return (
    <TellerViewContextProvider>
      <div class="h-screen w-screen overflow-hidden">
        <UserNavigationBar />
        <div class="flex flex-row overflow-hidden">
          <ProductGrid />
          <UserCart />
        </div>
        <CheckOutModal />
      </div>
    </TellerViewContextProvider>
  );
}
