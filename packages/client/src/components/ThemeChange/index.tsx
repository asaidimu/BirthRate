import { BiSolidMoon, BiSolidSun } from "solid-icons/bi";
import { createEffect, createSignal, on } from "solid-js";
import { useApplicationContext } from "../../app/context";
import { setDocumentTheme } from "../../app/lib/ThemeUtils";

function ThemeChanger() {
  const { storage } = useApplicationContext();
  const [checked, setChecked] = createSignal(
    storage.getTheme()?.localeCompare("business") === 0
  );

  createEffect(
    on(
      checked,
      () => {
        const theme = checked() ? "business" : "light";
        storage.setTheme({ theme });
        setDocumentTheme({ theme });
      },
      { defer: true }
    )
  );

  return (
    <label class="swap swap-rotate">
      <input type="checkbox" checked={checked()} />
      <button
        onClick={() => setChecked(true)}
        class="h-12 w-12 swap-on flex items-center justify-center"
      >
        <BiSolidMoon class="fill-base-content" size="24px" />
      </button>
      <button
        onClick={() => setChecked(false)}
        class="h-12 w-12 swap-off flex items-center justify-center"
      >
        <BiSolidSun class="fill-base-content" size="24px" />
      </button>
    </label>
  );
}
export default ThemeChanger;
