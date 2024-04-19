import { IoPower } from "solid-icons/io";
import { useApplicationContext } from "../../app/context";
import ThemeChanger from "../../components/ThemeChange";
import { createMemo, createSignal, onMount } from "solid-js";
import { useLocation } from "@solidjs/router";

export default () => {
  const { user } = useApplicationContext();
  const location = useLocation();
  const title = createMemo(() => {
    const parts = location.pathname.split("/");
    if (parts.length >= 3) {
      const result = parts[2];
      return result.charAt(0).toUpperCase() + result.slice(1);
    }
    return "Untitled";
  });

  return (
    <div class="navbar bg-base-100 p-4">
      <div class="flex flex-col gap-2 items-start">
        <h1 class="font-bold text-3xl">{title()}</h1>
      </div>
      <span class="flex-grow" />
      <div class="flex-none">
          <ThemeChanger />
          <button
            onClick={() => user.signOut()}
            class="h-12 w-12 swap-on flex items-center justify-center"
          >
            <IoPower class="fill-base-content" size="24px" />
          </button>
        </div>
    </div>
  );
};
